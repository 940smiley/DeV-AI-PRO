# DeV-AI-PRO

**DeV-AI-PRO** is an advanced AI-powered development assistant designed to streamline repository management, automate pull request reviews, and triage bug reports. It integrates with Google Gemini to provide intelligent insights and automated fixes for common development bottlenecks.

## Core Features

- **PR Automation:** Automatically labels PRs by urgency, detects merge conflicts, and summarizes CI failures.
- **Bug Triage:** Intelligent classification and severity labeling for incoming issues.
- **Self-Repair:** Automated workflows that attempt to fix failing checks and refresh dependencies.
- **Multi-Repo Support:** Capability to process multiple repositories simultaneously.
- **AI Integration:** Powered by Google Gemini for high-context code analysis and recommendations.

## Tech Stack

- **Framework:** React + Vite
- **AI Engine:** Google Gemini API
- **Automation:** GitHub Actions, Node.js scripts
- **Language:** TypeScript

## Quick Start

### Prerequisites
- Node.js (v18+)
- GitHub Token (with repository write permissions)
- Gemini API Key

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   Create a `.env.local` file and set:
   ```env
   GEMINI_API_KEY=your_gemini_key
   GITHUB_TOKEN=your_github_token
   GITHUB_REPOSITORY=owner/repo
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Automation Commands
- `npm run pr:automation` – Run the local automation engine.
- `npm run typecheck` – Validate TypeScript types.
- `npm run build` – Create a production build.

## TODO List

- [ ] **Advanced Reviews:** Enhance the AI review logic to provide deeper architectural feedback.
- [ ] **Dashboard UI:** Improve the ApiKeyStatusIndicator and ChatInputContainer for better user experience.
- [ ] **Custom Rules:** Implement a configuration system for user-defined automation rules.
- [ ] **Logging:** Add centralized logging for automation runs to track AI decision-making.
- [ ] **Integration:** Support for additional AI providers (OpenAI, Anthropic).

## License

MIT License
