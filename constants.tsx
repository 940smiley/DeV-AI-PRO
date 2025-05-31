import React from 'react';
import { ExpertiseArea, ExpertiseAreaId } from './types';

// Heroicons (MIT License) - https://heroicons.com
const CodeBracketSquareIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.5 4.5a3 3 0 0 0-3 3v.75a.75.75 0 0 1-1.5 0v-.75a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5v.75a.75.75 0 0 1-1.5 0v-.75a3 3 0 0 0-3-3h-3Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M13.5 19.5a3 3 0 0 0 3-3v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 0 1-4.5 4.5h-3a4.5 4.5 0 0 1-4.5-4.5v-.75a.75.75 0 0 1 1.5 0v.75a3 3 0 0 0 3 3h3Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M10.102 10.39A.75.75 0 0 1 10.5 9.75h.008a.75.75 0 0 1 .688.43l1.9 4.218a.75.75 0 0 1-.217 1.002l-.95.475a.75.75 0 0 1-1.002-.217l-1.9-4.218a.75.75 0 0 1 .529-.938Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M13.102 10.39A.75.75 0 0 1 13.5 9.75h.008a.75.75 0 0 1 .688.43l1.9 4.218a.75.75 0 0 1-.217 1.002l-.95.475a.75.75 0 0 1-1.002-.217l-1.9-4.218a.75.75 0 0 1 .529-.938Z" clipRule="evenodd" />
  </svg>
);

const CubeTransparentIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM11.03 7.97a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Zm3.72-.03a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06ZM11.03 14.97a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Zm3.72-.03a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

const CommandLineIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h15a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 19.5 2h-15Zm0 1.5h15v10h-15v-10ZM6.75 6.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z" clipRule="evenodd" />
    <path d="M3 17.25a.75.75 0 0 0 .75.75h5.25a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0-.75.75Z" />
    <path d="M10.5 17.25a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 0-1.5h-7.5a.75.75 0 0 0-.75.75Z" />
  </svg>
);

const CogIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.948 1.524l-.46 1.723a.75.75 0 0 0 .358.84.75.75 0 0 0 .84-.358l.46-1.723A.498.498 0 0 1 11.078 3.75h1.844c.19 0 .362.098.46.274l.46 1.723a.75.75 0 0 0 .84.358.75.75 0 0 0 .358-.84l-.46-1.723A2.001 2.001 0 0 0 12.922 2.25h-1.844Zm-2.655 9.163c0-.36.218-.682.53-.84l1.723-.46a.75.75 0 0 0 .358-.84.75.75 0 0 0-.84-.358l-1.723.46a2.001 2.001 0 0 0-1.524 1.948v1.844c0 .794.498 1.503 1.234 1.803l1.723.46a.75.75 0 0 0 .84-.358.75.75 0 0 0-.358-.84l-1.723-.46a.498.498 0 0 1-.274-.46V11.413Zm10.922 0c0-.794-.498-1.503-1.234-1.803l-1.723-.46a.75.75 0 0 0-.84.358.75.75 0 0 0 .358.84l1.723.46c.313.158.53.48.53.84v1.844c0 .19-.098.362-.274.46l-1.723.46a.75.75 0 0 0-.358.84.75.75 0 0 0 .84.358l1.723-.46a2.001 2.001 0 0 0 1.524-1.948v-1.844Zm-2.655-9.163c.312-.158.53-.48.53-.84V8.567c0-.19-.098.362-.274-.46l-1.723-.46a.75.75 0 0 0-.358.84.75.75 0 0 0 .84.358l1.723.46c.313.158.53.48.53.84Zm-6.112 2.655c.19 0 .362.098.46.274l.46 1.723a.75.75 0 0 0 .84.358.75.75 0 0 0 .358-.84l-.46-1.723A2.001 2.001 0 0 0 12.922 6h-1.844a2.001 2.001 0 0 0-1.948 1.524l-.46 1.723a.75.75 0 0 0 .358.84.75.75 0 0 0 .84-.358l.46-1.723a.498.498 0 0 1 .46-.274h1.844Z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.533 1.403 12.01 12.01 0 0 1-4.923 2.094A12.01 12.01 0 0 1 7 22.671a2.25 2.25 0 0 1-.533-1.403l-.001-.144a3.75 3.75 0 0 1 .003-1.095 48.942 48.942 0 0 1 10.5-.002c.001.364.002.729.003 1.095Z" />
  </svg>
);

const LightBulbIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25a.75.75 0 0 1 .75.75v.518c.07.005.14.012.212.024a10.92 10.92 0 0 1 4.64 1.716.75.75 0 0 1-.445 1.382 9.42 9.42 0 0 0-3.943-1.472v2.84c0 .455.047.9.138 1.332l.283 1.314c.349 1.623 1.651 2.925 3.274 3.274l1.314.283c.432.091.877.138 1.332.138h.518a.75.75 0 0 1 0 1.5h-.518c-.005.07-.012.14-.024.212a10.92 10.92 0 0 1-1.716 4.64.75.75 0 0 1-1.382-.445 9.42 9.42 0 0 0 1.472-3.943h-2.84c-.455 0-.9-.047-1.332-.138l-1.314-.283a3.477 3.477 0 0 1-3.274-3.274l-.283-1.314A5.221 5.221 0 0 1 8.25 12v-2.84a9.42 9.42 0 0 0-3.943 1.472.75.75 0 0 1-.445-1.382 10.92 10.92 0 0 1 4.64-1.716c.072-.012.142-.019.212-.024V3a.75.75 0 0 1 .75-.75ZM10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
    <path d="M15.75 19.5a3 3 0 0 1-6 0h6Z" />
  </svg>
);

const GlobeAltIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.625 7.5a.75.75 0 0 0-1.5 0v1.558c-.369.08-.72.19-1.048.333a.75.75 0 1 0 .508 1.433A5.992 5.992 0 0 1 7.5 10.51V12a.75.75 0 0 0 1.5 0v-1.558c.369-.08.72-.19 1.048-.333a.75.75 0 0 0-.508-1.433A5.992 5.992 0 0 1 8.625 8.99V7.5Zm7.252 1.716a.75.75 0 0 0-.508-1.433 5.99 5.99 0 0 0-1.12 4.158.75.75 0 1 0 1.433.508 4.493 4.493 0 0 1 .825-3.233Z" clipRule="evenodd" />
    <path d="M12 7.341a5.992 5.992 0 0 0-4.545 2.356.75.75 0 0 0 1.194.912 4.493 4.493 0 0 1 6.703 0 .75.75 0 0 0 1.194-.912A5.992 5.992 0 0 0 12 7.341Zm1.875 6.916a.75.75 0 0 0-1.06-.024l-1.793 1.598v1.401a.75.75 0 0 0 1.5 0v-.928l1.228-1.092a.75.75 0 0 0 .125-1.055Z" />
  </svg>
);

const LinkIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const GitHubIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: ExpertiseAreaId.GENERAL_ASSISTANT,
    name: 'General Assistant',
    icon: <LightBulbIcon className="w-5 h-5" />,
    description: 'General purpose AI assistance for a variety of queries.',
  },
  {
    id: ExpertiseAreaId.WEB3_DAPPS,
    name: 'Web3 & DApps',
    icon: <CubeTransparentIcon className="w-5 h-5" />,
    description: 'Expertise in decentralized applications, smart contracts, and Web3 technologies.',
  },
  {
    id: ExpertiseAreaId.BLOCKCHAIN_STACK,
    name: 'Blockchain Stack',
    icon: <LinkIcon className="w-5 h-5" />,
    description: 'Deep knowledge of blockchain protocols, consensus mechanisms, and infrastructure.',
  },
  {
    id: ExpertiseAreaId.WEB_DEVELOPMENT,
    name: 'Web Development',
    icon: <CodeBracketSquareIcon className="w-5 h-5" />,
    description: 'Assistance with frontend/backend development, frameworks, and best practices.',
  },
  {
    id: ExpertiseAreaId.PYTHON_PROGRAMMING,
    name: 'Python Programming',
    icon: <CommandLineIcon className="w-5 h-5" />, 
    description: 'Support for Python syntax, libraries, scripting, and data science applications.',
  },
  {
    id: ExpertiseAreaId.GITHUB_EXPERT,
    name: 'GitHub Expert',
    icon: <GitHubIcon className="w-5 h-5" />,
    description: 'Guidance on Git, GitHub workflows, actions, and repository management.',
  },
  {
    id: ExpertiseAreaId.AUTOMATION_OPTIONS,
    name: 'Automation Options',
    icon: <CogIcon className="w-5 h-5" />,
    description: 'Insights on automating tasks, script generation, and CI/CD pipelines.',
  },
  {
    id: ExpertiseAreaId.BOT_SWARM_PRODUCTION,
    name: 'Bot Swarm Design',
    icon: <UsersIcon className="w-5 h-5" />,
    description: 'Conceptualization of multi-agent systems, bot interactions, and swarm intelligence.',
  },
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const SYSTEM_INSTRUCTIONS: Record<ExpertiseAreaId, string> = {
  [ExpertiseAreaId.GENERAL_ASSISTANT]: "You are a helpful and versatile AI assistant. Provide clear and concise answers.",
  [ExpertiseAreaId.WEB3_DAPPS]: "You are an expert AI assistant specializing in Web3, DApps, and smart contract development. Provide detailed and accurate information relevant to this domain. Explain concepts clearly and offer practical examples where possible.",
  [ExpertiseAreaId.BLOCKCHAIN_STACK]: "You are an AI expert on blockchain technology stacks, including protocols, consensus algorithms, and cryptographic principles. Offer in-depth explanations and comparisons. Focus on technical accuracy.",
  [ExpertiseAreaId.WEB_DEVELOPMENT]: "You are a senior web development AI assistant. Help with coding problems, explain frameworks (like React, Angular, Vue, Node.js), discuss best practices, and offer architectural advice for web applications.",
  [ExpertiseAreaId.PYTHON_PROGRAMMING]: "You are an expert Python programming AI assistant. Provide help with Python syntax, standard library, popular packages (like NumPy, Pandas, TensorFlow, Django, Flask), scripting, and general Python development. Offer code examples and debugging tips.",
  [ExpertiseAreaId.GITHUB_EXPERT]: "You are a GitHub expert AI assistant. Explain Git commands, GitHub workflows, Actions, pull requests, branching strategies, and best practices for repository management and collaboration. Help troubleshoot Git issues.",
  [ExpertiseAreaId.AUTOMATION_OPTIONS]: "You are an AI assistant focused on automation. Suggest ways to automate tasks, generate scripts (Python, Bash, PowerShell), design CI/CD pipelines, and discuss automation tools and strategies. Provide practical, actionable advice.",
  [ExpertiseAreaId.BOT_SWARM_PRODUCTION]: "You are an AI assistant specializing in the conceptual design of bot swarms and multi-agent systems. Discuss architectures, communication protocols, agent roles, coordination strategies, and potential applications for bot swarms. Think creatively and provide structured design ideas.",
};

export const API_KEY_CHECK_MESSAGE = "Attempting to use API key from environment variable (process.env.API_KEY). Ensure it is correctly set up in your environment for the app to function.";
export const API_KEY_MISSING_MESSAGE = "Error: Gemini API Key (process.env.API_KEY) is not detected in the environment. Please set it up to use the AI features. This application CANNOT prompt you for the key.";

export const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred. Please try again.";
export const GEMINI_API_ERROR_MESSAGE = "Error communicating with the AI. Please check your API key and network connection, then try again.";