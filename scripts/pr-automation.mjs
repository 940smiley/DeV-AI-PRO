#!/usr/bin/env node

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const apiBase = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const dryRun = process.env.DRY_RUN === 'true';
const autoMergeLabel = process.env.AUTO_MERGE_LABEL ?? 'automerge';

if (!token || !repo) {
  console.error('Missing required env vars: GITHUB_TOKEN and GITHUB_REPOSITORY');
  process.exit(1);
}

const [owner, name] = repo.split('/');

async function gh(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status} ${response.statusText} on ${path}: ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function listAll(path) {
  let page = 1;
  const results = [];

  while (true) {
    const data = await gh(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
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

async function ensureLabels(issueNumber, labels) {
  if (labels.length === 0) {
    return;
  }

  if (dryRun) {
    console.log(`[DRY_RUN] would add labels to #${issueNumber}: ${labels.join(', ')}`);
    return;
  }

  await gh(`/repos/${owner}/${name}/issues/${issueNumber}/labels`, {
    method: 'POST',
    body: JSON.stringify({ labels }),
  });
}

async function removeLabel(issueNumber, label) {
  if (dryRun) {
    console.log(`[DRY_RUN] would remove label \"${label}\" from #${issueNumber}`);
    return;
  }

  try {
    await gh(`/repos/${owner}/${name}/issues/${issueNumber}/labels/${encodeURIComponent(label)}`, {
      method: 'DELETE',
    });
  } catch (error) {
    if (!String(error.message).includes('404')) {
      throw error;
    }
  }
}

function classifyPriority(pr, hasBlockingChecks) {
  if (hasBlockingChecks) {
    return 'priority:high';
  }
  if (pr.mergeable_state === 'dirty') {
    return 'priority:medium';
  }
  return 'priority:low';
}

async function processPullRequest(pr) {
  const details = await gh(`/repos/${owner}/${name}/pulls/${pr.number}`);
  const checks = await gh(`/repos/${owner}/${name}/commits/${details.head.sha}/check-runs`);

  const failingChecks = (checks.check_runs ?? []).filter((run) => run.conclusion === 'failure' || run.conclusion === 'cancelled');
  const pendingChecks = (checks.check_runs ?? []).filter((run) => run.status !== 'completed');
  const mergeReady = details.mergeable && !details.draft && failingChecks.length === 0 && pendingChecks.length === 0;

  const labelsToAdd = [];

  if (details.mergeable_state === 'dirty') {
    labelsToAdd.push('needs:conflict-resolution');
  }

  if (failingChecks.length > 0) {
    labelsToAdd.push('needs:ci-fix');
  }

  const priorityLabel = classifyPriority(details, failingChecks.length > 0);
  labelsToAdd.push(priorityLabel);

  const missing = labelsToAdd.filter((label) => !hasLabel(details, label));
  await ensureLabels(details.number, missing);

  const stalePriority = ['priority:high', 'priority:medium', 'priority:low'].filter((label) => label !== priorityLabel && hasLabel(details, label));
  for (const label of stalePriority) {
    await removeLabel(details.number, label);
  }

  console.log(`PR #${details.number} (${details.title}) => mergeable_state=${details.mergeable_state}, failing=${failingChecks.length}, pending=${pendingChecks.length}`);

  const canAutomerge = hasLabel(details, autoMergeLabel) || process.env.AUTO_MERGE_ALL === 'true';
  if (mergeReady && canAutomerge) {
    if (dryRun) {
      console.log(`[DRY_RUN] would merge PR #${details.number}`);
    } else {
      await gh(`/repos/${owner}/${name}/pulls/${details.number}/merge`, {
        method: 'PUT',
        body: JSON.stringify({
          merge_method: 'squash',
          sha: details.head.sha,
          commit_title: `${details.title} (#${details.number})`,
        }),
      });
      console.log(`Merged PR #${details.number}`);
    }
  }
}

async function processIssue(issue) {
  const labelsToAdd = [];
  if (!hasLabel(issue, 'type:bug')) {
    labelsToAdd.push('type:bug');
  }

  const isCritical = /critical|severity\s*[:=]\s*1|p0|urgent/i.test(`${issue.title}\n${issue.body ?? ''}`);
  labelsToAdd.push(isCritical ? 'severity:critical' : 'severity:normal');

  const missing = labelsToAdd.filter((label) => !hasLabel(issue, label));
  await ensureLabels(issue.number, missing);

  if (isCritical && !hasLabel(issue, 'priority:high')) {
    await ensureLabels(issue.number, ['priority:high']);
  }

  console.log(`Issue #${issue.number} triaged => critical=${isCritical}`);
}

async function main() {
  console.log(`Starting PR/Bug automation for ${repo} (dryRun=${dryRun})`);

  const [openPrs, openBugs] = await Promise.all([
    listAll(`/repos/${owner}/${name}/pulls?state=open`),
    listAll(`/repos/${owner}/${name}/issues?state=open&labels=bug`),
  ]);

  for (const pr of openPrs) {
    await processPullRequest(pr);
  }

  for (const issue of openBugs.filter((issue) => !issue.pull_request)) {
    await processIssue(issue);
  }

  console.log(`Processed ${openPrs.length} PR(s) and ${openBugs.length} bug issue(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
