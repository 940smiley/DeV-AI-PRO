#!/usr/bin/env node

const token = process.env.GITHUB_TOKEN;
const defaultRepo = process.env.GITHUB_REPOSITORY;
const apiBase = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const dryRun = process.env.DRY_RUN === 'true';
const autoMergeLabel = process.env.AUTO_MERGE_LABEL ?? 'automerge';
const autoMergeAll = process.env.AUTO_MERGE_ALL === 'true';
const targetReposEnv = process.env.TARGET_REPOSITORIES ?? '';
const mergeMethod = process.env.AUTO_MERGE_METHOD ?? 'squash';
const maxRetries = Number.parseInt(process.env.GITHUB_API_MAX_RETRIES ?? '3', 10);
const retryDelayMs = Number.parseInt(process.env.GITHUB_API_RETRY_DELAY_MS ?? '1500', 10);

const targetRepos = targetReposEnv
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

if (targetRepos.length === 0 && defaultRepo) {
  targetRepos.push(defaultRepo);
}

if (targetRepos.length === 0) {
  if (dryRun) {
    console.log('No repositories configured (GITHUB_REPOSITORY/TARGET_REPOSITORIES). DRY_RUN enabled; exiting without changes.');
    process.exit(0);
  }

  console.error('Missing repository configuration. Set GITHUB_REPOSITORY or TARGET_REPOSITORIES.');
  process.exit(1);
}

if (!token) {
  if (dryRun) {
    console.log('GITHUB_TOKEN not provided. DRY_RUN enabled; repository mutations and API reads are skipped.');
    process.exit(0);
  }

  console.error('Missing required env var: GITHUB_TOKEN');
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gh(owner, name, path, options = {}) {
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers ?? {}),
      },
    });

    if (response.ok) {
      if (response.status === 204) {
        return null;
      }
      return response.json();
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === maxRetries) {
      const text = await response.text();
      throw new Error(`GitHub API ${response.status} ${response.statusText} on ${owner}/${name}${path}: ${text}`);
    }

    await sleep(retryDelayMs * attempt);
  }

  return null;
}

async function listAll(owner, name, path) {
  let page = 1;
  const results = [];

  while (true) {
    const data = await gh(owner, name, `${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    results.push(...data);

    if (data.length < 100) {
      break;
    }

    page += 1;
  }

  return results;
}

function hasLabel(item, label) {
  return (item.labels ?? []).some((l) => l.name === label);
}

async function ensureLabels(owner, name, issueNumber, labels) {
  if (labels.length === 0) {
    return;
  }

  if (dryRun) {
    console.log(`[DRY_RUN] would add labels to ${owner}/${name}#${issueNumber}: ${labels.join(', ')}`);
    return;
  }

  await gh(owner, name, `/repos/${owner}/${name}/issues/${issueNumber}/labels`, {
    method: 'POST',
    body: JSON.stringify({ labels }),
  });
}

async function removeLabel(owner, name, issueNumber, label) {
  if (dryRun) {
    console.log(`[DRY_RUN] would remove label "${label}" from ${owner}/${name}#${issueNumber}`);
    return;
  }

  try {
    await gh(owner, name, `/repos/${owner}/${name}/issues/${issueNumber}/labels/${encodeURIComponent(label)}`, {
      method: 'DELETE',
    });
  } catch (error) {
    if (!String(error.message).includes('404')) {
      throw error;
    }
  }
}

function classifyPriority(pr, failingChecks) {
  if (failingChecks.length > 0) {
    return 'priority:high';
  }
  if (pr.mergeable_state === 'dirty' || pr.mergeable_state === 'blocked') {
    return 'priority:medium';
  }
  return 'priority:low';
}

function summarizeFailingChecks(checkRuns) {
  return checkRuns.map((run) => `- ${run.name}: ${run.conclusion ?? run.status}`).join('\n');
}

async function ensureComment(owner, name, issueNumber, marker, body) {
  const comments = await listAll(owner, name, `/repos/${owner}/${name}/issues/${issueNumber}/comments`);
  const exists = comments.some((comment) => (comment.body ?? '').includes(marker));
  if (exists) {
    return;
  }

  if (dryRun) {
    console.log(`[DRY_RUN] would post comment on ${owner}/${name}#${issueNumber}`);
    return;
  }

  await gh(owner, name, `/repos/${owner}/${name}/issues/${issueNumber}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
}

async function processPullRequest(owner, name, pr) {
  const details = await gh(owner, name, `/repos/${owner}/${name}/pulls/${pr.number}`);
  const checks = await gh(owner, name, `/repos/${owner}/${name}/commits/${details.head.sha}/check-runs`);

  const checkRuns = checks.check_runs ?? [];
  const failingChecks = checkRuns.filter((run) => run.conclusion === 'failure' || run.conclusion === 'cancelled');
  const pendingChecks = checkRuns.filter((run) => run.status !== 'completed');
  const mergeReady = details.mergeable && !details.draft && failingChecks.length === 0 && pendingChecks.length === 0;

  const labelsToAdd = [];

  if (details.mergeable_state === 'dirty') {
    labelsToAdd.push('needs:conflict-resolution');
  }

  if (failingChecks.length > 0) {
    labelsToAdd.push('needs:ci-fix');
  }

  const priorityLabel = classifyPriority(details, failingChecks);
  labelsToAdd.push(priorityLabel);

  const missing = labelsToAdd.filter((label) => !hasLabel(details, label));
  await ensureLabels(owner, name, details.number, missing);

  const stalePriority = ['priority:high', 'priority:medium', 'priority:low'].filter(
    (label) => label !== priorityLabel && hasLabel(details, label),
  );
  for (const label of stalePriority) {
    await removeLabel(owner, name, details.number, label);
  }

  if (failingChecks.length > 0) {
    const marker = '<!-- pr-automation:ci-summary -->';
    const body = `${marker}\nCI checks are currently failing for this PR.\n\n${summarizeFailingChecks(failingChecks)}`;
    await ensureComment(owner, name, details.number, marker, body);
  }

  console.log(
    `${owner}/${name} PR #${details.number} (${details.title}) => mergeable_state=${details.mergeable_state}, failing=${failingChecks.length}, pending=${pendingChecks.length}`,
  );

  const canAutomerge = hasLabel(details, autoMergeLabel) || autoMergeAll;
  if (mergeReady && canAutomerge) {
    if (dryRun) {
      console.log(`[DRY_RUN] would merge ${owner}/${name} PR #${details.number}`);
    } else {
      await gh(owner, name, `/repos/${owner}/${name}/pulls/${details.number}/merge`, {
        method: 'PUT',
        body: JSON.stringify({
          merge_method: mergeMethod,
          sha: details.head.sha,
          commit_title: `${details.title} (#${details.number})`,
        }),
      });
      console.log(`Merged ${owner}/${name} PR #${details.number}`);
    }
  }
}

function issueSeverity(issue) {
  const content = `${issue.title}\n${issue.body ?? ''}`;
  if (/critical|severity\s*[:=]\s*1|p0|urgent/i.test(content)) {
    return 'severity:critical';
  }
  if (/severity\s*[:=]\s*2|p1|high/i.test(content)) {
    return 'severity:high';
  }
  return 'severity:normal';
}

function isBugIssue(issue) {
  if (hasLabel(issue, 'bug') || hasLabel(issue, 'type:bug')) {
    return true;
  }

  return /\bbug\b|\berror\b|\bdefect\b|\bregression\b/i.test(`${issue.title}\n${issue.body ?? ''}`);
}

async function processIssue(owner, name, issue) {
  const labelsToAdd = [];
  if (!hasLabel(issue, 'type:bug')) {
    labelsToAdd.push('type:bug');
  }

  const severityLabel = issueSeverity(issue);
  labelsToAdd.push(severityLabel);

  const priorityLabel = severityLabel === 'severity:critical' ? 'priority:high' : 'priority:medium';
  labelsToAdd.push(priorityLabel);

  const missing = labelsToAdd.filter((label) => !hasLabel(issue, label));
  await ensureLabels(owner, name, issue.number, missing);

  const staleSeverity = ['severity:critical', 'severity:high', 'severity:normal'].filter(
    (label) => label !== severityLabel && hasLabel(issue, label),
  );
  for (const label of staleSeverity) {
    await removeLabel(owner, name, issue.number, label);
  }

  console.log(`${owner}/${name} Issue #${issue.number} triaged => ${severityLabel}`);
}

async function processRepository(repo) {
  const [owner, name] = repo.split('/');
  if (!owner || !name) {
    throw new Error(`Invalid repository format: ${repo}. Expected owner/name.`);
  }

  const [openPrs, openIssues] = await Promise.all([
    listAll(owner, name, `/repos/${owner}/${name}/pulls?state=open`),
    listAll(owner, name, `/repos/${owner}/${name}/issues?state=open`),
  ]);

  let processedBugs = 0;

  for (const pr of openPrs) {
    await processPullRequest(owner, name, pr);
  }

  for (const issue of openIssues.filter((item) => !item.pull_request && isBugIssue(item))) {
    processedBugs += 1;
    await processIssue(owner, name, issue);
  }

  return { repo, prs: openPrs.length, bugs: processedBugs, issues: openIssues.length };
}

async function main() {
  console.log(`Starting PR/Bug automation for ${targetRepos.join(', ')} (dryRun=${dryRun})`);

  const summary = [];
  for (const repo of targetRepos) {
    const result = await processRepository(repo);
    summary.push(result);
  }

  for (const entry of summary) {
    console.log(
      `Summary ${entry.repo}: processed ${entry.prs} PR(s), ${entry.bugs} bug issue(s) from ${entry.issues} total open issue(s).`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
