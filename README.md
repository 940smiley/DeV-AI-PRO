# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. Run the app:
   `npm run dev`

## PR and bug automation

This repository includes automation to process open pull requests and bug issues.

- Scheduled workflow: `.github/workflows/pr-automation.yml` (runs every 30 minutes)
- Dependabot updates: `.github/dependabot.yml`
- Local automation runner: `npm run pr:automation`

### Required environment variables for local execution

- `GITHUB_TOKEN`: token with repository write permissions
- `GITHUB_REPOSITORY`: repository in `owner/name` format

Optional:

- `DRY_RUN=true` to report actions without mutating
- `AUTO_MERGE_LABEL` to override the merge label (default `automerge`)
- `AUTO_MERGE_ALL=true` to merge all merge-ready PRs
