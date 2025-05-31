
import React from 'react';

export enum SenderType {
  USER = 'user',
  AI = 'ai',
  ERROR = 'error'
}

export interface Message {
  id: string;
  sender: SenderType;
  text: string;
  imagePreviewUrl?: string; // For user messages with uploaded images
  timestamp: number;
}

export enum ExpertiseAreaId {
  WEB3_DAPPS = 'WEB3_DAPPS',
  BLOCKCHAIN_STACK = 'BLOCKCHAIN_STACK',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
  PYTHON_PROGRAMMING = 'PYTHON_PROGRAMMING',
  GITHUB_EXPERT = 'GITHUB_EXPERT',
  AUTOMATION_OPTIONS = 'AUTOMATION_OPTIONS',
  BOT_SWARM_PRODUCTION = 'BOT_SWARM_PRODUCTION',
  GENERAL_ASSISTANT = 'GENERAL_ASSISTANT'
}

export interface ExpertiseArea {
  id: ExpertiseAreaId;
  name: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; // Changed to be more specific
  description: string;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  name: string;
}