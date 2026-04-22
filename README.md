# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. Run the app:
   `npm run dev`

## Validation and build

- Type-check only: `npm run typecheck`
- Full validation (typecheck + production build): `npm run check`
- Production build only: `npm run build`

## PR and bug automation

This repository includes automation to process open pull requests and bug issues.

- Scheduled workflow: `.github/workflows/pr-automation.yml` (runs every 15 minutes)
- CI workflow: `.github/workflows/ci.yml` (runs on push + pull requests)
- Self-repair workflow: `.github/workflows/self-repair.yml` (runs every 6 hours)
- Dependabot updates: `.github/dependabot.yml`
- Local automation runner: `npm run pr:automation`

### Automation features

- Processes open PRs and labels by urgency (`priority:high|medium|low`).
- Detects merge conflicts and failing checks (`needs:conflict-resolution`, `needs:ci-fix`).
- Posts a one-time CI summary comment on failing PRs.
- Auto-merges merge-ready PRs when `automerge` label is present (or `AUTO_MERGE_ALL=true`).
- Triages bug issues with `type:bug` + severity labels.
- Supports multi-repository processing via `TARGET_REPOSITORIES=owner/repo,owner/repo2`.

### Required environment variables for local execution

- `GITHUB_TOKEN`: token with repository write permissions
- `GITHUB_REPOSITORY`: repository in `owner/name` format

Optional:

- `TARGET_REPOSITORIES`: comma-separated repositories to process
- `DRY_RUN=true` to report actions without mutating
- `AUTO_MERGE_LABEL` to override the merge label (default `automerge`)
- `AUTO_MERGE_ALL=true` to merge all merge-ready PRs
- `AUTO_MERGE_METHOD=squash|merge|rebase` (default `squash`)
- `GITHUB_API_MAX_RETRIES` and `GITHUB_API_RETRY_DELAY_MS` for API retry behavior
