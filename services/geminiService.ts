import { GoogleGenAI, GenerateContentResponse, Part, Content } from '@google/genai';
import {
  GEMINI_MODEL_NAME,
  SYSTEM_INSTRUCTIONS,
  DEFAULT_ERROR_MESSAGE,
  GEMINI_API_ERROR_MESSAGE,
} from '../constants.tsx';
import { ExpertiseAreaId } from '../types';

let ai: GoogleGenAI | null = null;

const getGoogleAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API_KEY or GEMINI_API_KEY environment variable is not set.');
      throw new Error('API_KEY_MISSING');
    }
    ai = new GoogleGenAI({ apiKey });
  }

  return ai;
};

interface GenerateDeveloperResponseParams {
  prompt: string;
  expertise: ExpertiseAreaId;
  imageBase64?: string;
  mimeType?: string;
}

export const generateDeveloperResponse = async (
  params: GenerateDeveloperResponseParams,
): Promise<string> => {
  const { prompt, expertise, imageBase64, mimeType } = params;

  try {
    const googleAI = getGoogleAI();
    const systemInstruction =
      SYSTEM_INSTRUCTIONS[expertise] ?? SYSTEM_INSTRUCTIONS[ExpertiseAreaId.GENERAL_ASSISTANT];

    const requestParts: Part[] = [];

    if (imageBase64 && mimeType) {
      requestParts.push({
        inlineData: {
          mimeType,
          data: imageBase64,
        },
      });
    }

    requestParts.push({ text: prompt });

    const contentRequest: Content = { role: 'user', parts: requestParts };

    const response: GenerateContentResponse = await googleAI.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: contentRequest,
      config: {
        systemInstruction,
      },
    });

    if (response?.text) {
      return response.text;
    }

    console.error('Gemini API response missing text:', response);
    return 'The AI returned an empty or invalid response. Please try again.';
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);

    if (error?.message === 'API_KEY_MISSING') {
      return 'Gemini API Key is not configured. Please ensure the API_KEY environment variable is set.';
    }

    if (typeof error?.message === 'string' && error.message.includes('Missing required API key')) {
      return error.message;
    }

    return `${GEMINI_API_ERROR_MESSAGE} Details: ${error?.message || DEFAULT_ERROR_MESSAGE}`;
  }
};

