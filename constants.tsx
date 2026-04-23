import React from 'react';
import { ExpertiseArea, ExpertiseAreaId } from './types';

// App/UI constants
export const GEMINI_MODEL_NAME = 'gemini-2.0-flash';
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';
export const GEMINI_API_ERROR_MESSAGE = 'There was an issue contacting Gemini.';
export const API_KEY_CHECK_MESSAGE = 'Gemini API key detected. You can start chatting.';
export const API_KEY_MISSING_MESSAGE = 'Gemini API key not set. Add GEMINI_API_KEY in .env.local';

// Icons
export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.59 2 12.253c0 4.512 2.865 8.332 6.839 9.683.5.097.682-.222.682-.494 0-.244-.009-.891-.014-1.75-2.782.617-3.369-1.37-3.369-1.37-.455-1.174-1.11-1.486-1.11-1.486-.907-.637.069-.624.069-.624 1.003.072 1.53 1.05 1.53 1.05.892 1.563 2.342 1.112 2.912.85.091-.662.35-1.112.636-1.368-2.221-.258-4.555-1.136-4.555-5.053 0-1.116.39-2.029 1.03-2.744-.103-.258-.447-1.297.098-2.704 0 0 .84-.272 2.75 1.048A9.33 9.33 0 0 1 12 7.533c.85.004 1.707.116 2.507.339 1.91-1.32 2.748-1.048 2.748-1.048.546 1.407.202 2.446.099 2.704.64.715 1.03 1.628 1.03 2.744 0 3.927-2.338 4.792-4.566 5.045.359.318.679.946.679 1.907 0 1.376-.013 2.485-.013 2.824 0 .274.18.595.688.493A10.006 10.006 0 0 0 22 12.253C22 6.59 17.523 2 12 2Z" clipRule="evenodd" />
  </svg>
);

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8.793 6.293a1 1 0 0 1 0 1.414L4.207 12l4.586 4.293a1 1 0 0 1-1.386 1.44l-5.333-5a1.5 1.5 0 0 1 0-2.466l5.333-5a1 1 0 0 1 1.386.026Zm6.414 0a1 1 0 0 1 1.386-.026l5.333 5a1.5 1.5 0 0 1 0 2.466l-5.333 5a1 1 0 1 1-1.386-1.44L19.793 12l-4.586-4.293a1 1 0 0 1 0-1.414Z" />
  </svg>
);

const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.26 2.265a1.5 1.5 0 0 1 1.48 0l7.5 4.125A1.5 1.5 0 0 1 21 7.72v8.56a1.5 1.5 0 0 1-.76 1.33l-7.5 4.125a1.5 1.5 0 0 1-1.48 0l-7.5-4.125A1.5 1.5 0 0 1 3 16.28V7.72a1.5 1.5 0 0 1 .76-1.33l7.5-4.125ZM12 4.077 5.25 7.72 12 11.364 18.75 7.72 12 4.077Zm-.75 8.51-6-3.3v6.993l6 3.3V12.587Zm1.5 6.993 6-3.3V9.287l-6 3.3v6.993Z"/>
  </svg>
);

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 0 0-8.078 6.546h5.38c.27-2.5 1.18-4.71 2.37-6.546Zm1.5 0c1.19 1.836 2.1 4.046 2.37 6.546h5.379A8.25 8.25 0 0 0 13.5 3.75Zm7.078 8.25h-5.385c-.067 2.323-.522 4.498-1.216 6.233a13.476 13.476 0 0 1-1.284 2.35A8.25 8.25 0 0 0 20.578 12Zm-7.078 8.25c.46-.673.892-1.5 1.26-2.433.729-1.827 1.206-4.14 1.276-6.567H8.964c.07 2.427.547 4.74 1.276 6.567.368.933.8 1.76 1.26 2.433Zm-2.25 0a13.533 13.533 0 0 1-1.284-2.35c-.694-1.735-1.149-3.91-1.216-6.233H3.75a8.25 8.25 0 0 0 7.5 8.583Z" clipRule="evenodd"/>
  </svg>
);

const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.25 12c0-4.694 4.257-8.5 9.5-8.5s9.5 3.806 9.5 8.5-4.257 8.5-9.5 8.5c-1.21 0-2.362-.2-3.42-.566L4 21.75l1.192-3.18A8.363 8.363 0 0 1 2.25 12Z"/>
  </svg>
);

const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.983 7.5a4.5 4.5 0 1 1 0 9.001 4.5 4.5 0 0 1 0-9Z"/><path fillRule="evenodd" d="M10.27 2.915a1.5 1.5 0 0 1 3.46 0l.174.735c.145.61.702 1.038 1.326 1.038h.75a1.5 1.5 0 0 1 1.414.986l.258.707a1.5 1.5 0 0 0 1.125.962l.743.15a1.5 1.5 0 0 1 .986 2.247l-.377.596a1.5 1.5 0 0 0 0 1.614l.377.596a1.5 1.5 0 0 1-.986 2.247l-.743.15a1.5 1.5 0 0 0-1.125.962l-.258.707a1.5 1.5 0 0 1-1.414.986h-.75a1.5 1.5 0 0 0-1.326 1.038l-.174.735a1.5 1.5 0 0 1-3.46 0l-.174-.735A1.5 1.5 0 0 0 8.77 19.5h-.75a1.5 1.5 0 0 1-1.414-.986l-.258-.707a1.5 1.5 0 0 0-1.125-.962l-.743-.15a1.5 1.5 0 0 1-.986-2.247l.377-.596a1.5 1.5 0 0 0 0-1.614l-.377-.596a1.5 1.5 0 0 1 .986-2.247l.743-.15c.49-.099.912-.43 1.125-.962l.258-.707A1.5 1.5 0 0 1 8.02 4.688h.75c.624 0 1.18-.428 1.326-1.038l.174-.735Z" clipRule="evenodd"/>
  </svg>
);

const HexagonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.143 2.513a2 2 0 0 1 1.714 0l6.286 2.943A2 2 0 0 1 20 7.254v9.492a2 2 0 0 1-1.857 1.798l-6.286 2.943a2 2 0 0 1-1.714 0l-6.286-2.943A2 2 0 0 1 4 16.746V7.254a2 2 0 0 1 1.857-1.798l6.286-2.943Z"/>
  </svg>
);

// Expertise areas for the sidebar
export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: ExpertiseAreaId.GENERAL_ASSISTANT,
    name: 'General Assistant',
    icon: <ChatIcon />,
    description: 'Helpful multi-domain assistant for everyday developer tasks.'
  },
  {
    id: ExpertiseAreaId.WEB_DEVELOPMENT,
    name: 'Web Development',
    icon: <GlobeIcon />,
    description: 'Frontend/backend help, React, APIs, performance, accessibility.'
  },
  {
    id: ExpertiseAreaId.PYTHON_PROGRAMMING,
    name: 'Python Programming',
    icon: <CodeIcon />,
    description: 'Python tips, packages, data, scripts, best practices.'
  },
  {
    id: ExpertiseAreaId.WEB3_DAPPS,
    name: 'Web3 DApps',
    icon: <HexagonIcon />,
    description: 'EVM chains, wallets, smart-contract UX, security.'
  },
  {
    id: ExpertiseAreaId.BLOCKCHAIN_STACK,
    name: 'Blockchain Stack',
    icon: <CubeIcon />,
    description: 'Solidity, indexing, node infra, transaction flow.'
  },
  {
    id: ExpertiseAreaId.GITHUB_EXPERT,
    name: 'GitHub Expert',
    icon: <GitHubIcon />,
    description: 'Actions, workflows, versioning, reviews, repo hygiene.'
  },
  {
    id: ExpertiseAreaId.AUTOMATION_OPTIONS,
    name: 'Automation',
    icon: <CogIcon />,
    description: 'CI/CD, scripting, RPA, job schedulers.'
  },
  {
    id: ExpertiseAreaId.BOT_SWARM_PRODUCTION,
    name: 'Bot Swarm',
    icon: <CogIcon />,
    description: 'Agent orchestration, reliability, monitoring.'
  }
];

// System instructions by expertise area
export const SYSTEM_INSTRUCTIONS: Record<ExpertiseAreaId, string> = {
  [ExpertiseAreaId.GENERAL_ASSISTANT]: 'You are a concise, friendly developer assistant. Prefer practical examples and actionable steps. Ask one clarifying question if needed.',
  [ExpertiseAreaId.WEB_DEVELOPMENT]: 'You are a senior web engineer. Give production-grade React/Vite/Node solutions, accessibility, performance, and security notes. Provide code snippets.',
  [ExpertiseAreaId.PYTHON_PROGRAMMING]: 'You are a Python expert. Prefer clear, typed examples. Cover packaging, venvs, testing, and error handling.',
  [ExpertiseAreaId.WEB3_DAPPS]: 'You are a Web3 DApp architect. Discuss wallet flows, contract interactions, chain selection, and user safety. Include code for ethers/web3.js and common pitfalls.',
  [ExpertiseAreaId.BLOCKCHAIN_STACK]: 'You are a blockchain core dev. Address Solidity, gas, events, indexing, node infra, and security audits. Include references to common tools.',
  [ExpertiseAreaId.GITHUB_EXPERT]: 'You are a GitHub guru. Optimize Actions, workflows, release strategies, branch protection, and CODEOWNERS. Provide YAML snippets.',
  [ExpertiseAreaId.AUTOMATION_OPTIONS]: 'You are an automation engineer. Suggest CI/CD, schedulers, IaC, and scripting. Compare trade-offs briefly and provide minimal reproducible scripts.',
  [ExpertiseAreaId.BOT_SWARM_PRODUCTION]: 'You design production agent swarms. Focus on orchestration, retries, circuit breakers, observability, and cost control.',
};

