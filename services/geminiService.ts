
import { GoogleGenAI, GenerateContentResponse, Part, Content } from "@google/genai";
import { GEMINI_MODEL_NAME, SYSTEM_INSTRUCTIONS, DEFAULT_ERROR_MESSAGE, GEMINI_API_ERROR_MESSAGE } from '../constants.tsx';
import { ExpertiseAreaId } from '../types';

let ai: GoogleGenAI | null = null;

const getGoogleAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable is not set.");
      throw new Error("API_KEY_MISSING");
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

export const generateDeveloperResponse = async (params: GenerateDeveloperResponseParams): Promise<string> => {
  const { prompt, expertise, imageBase64, mimeType } = params;
  try {
    const googleAI = getGoogleAI();
    const systemInstruction = SYSTEM_INSTRUCTIONS[expertise] || SYSTEM_INSTRUCTIONS[ExpertiseAreaId.GENERAL_ASSISTANT];

    const requestParts: Part[] = [];

    if (imageBase64 && mimeType) {
      requestParts.push({ 
        inlineData: {
          mimeType: mimeType,
          data: imageBase64,
        },
      });
    }
    // Always add text part, even if it's just to say "Describe the image"
    requestParts.push({ text: prompt });
    
    const contentRequest: Content = { role: "user", parts: requestParts };

    const response: GenerateContentResponse = await googleAI.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: contentRequest,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return extractResponseText(response as GeminiResponse);
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message === "API_KEY_MISSING") {
      return "Gemini API Key is not configured. Please ensure the API_KEY environment variable is set.";
    }
    if (error.message.includes("Missing required API key")) {
      return error.message;
    }
    // It's good practice to check for specific Gemini errors if the SDK provides them
    // For now, a general message.
    return `${GEMINI_API_ERROR_MESSAGE} Details: ${error.message || DEFAULT_ERROR_MESSAGE}`;
  }
};

// Streaming version (optional, if you want to implement streaming responses)
// export const generateDeveloperResponseStream = async function* (
//   params: GenerateDeveloperResponseParams
// ): AsyncGenerator<string, void, undefined> {
//   const { prompt, expertise, imageBase64, mimeType } = params;
//   try {
//     const googleAI = getGoogleAI();
//     const systemInstruction = SYSTEM_INSTRUCTIONS[expertise] || SYSTEM_INSTRUCTIONS[ExpertiseAreaId.GENERAL_ASSISTANT];
//     const requestParts: Part[] = [];

//     if (imageBase64 && mimeType) {
//       requestParts.push({
//         inlineData: {
//           mimeType: mimeType,
//           data: imageBase64,
//         },
//       });
//     }
//     requestParts.push({ text: prompt });
    
//     const contentRequest: Content = { role: "user", parts: requestParts };

//     const streamResult = await googleAI.models.generateContentStream({
//       model: GEMINI_MODEL_NAME,
//       contents: contentRequest,
//       config: {
//         systemInstruction: systemInstruction,
//       }
//     });

//     for await (const chunk of streamResult) { 
//       if (chunk && chunk.text) { 
//         yield chunk.text; 
//       }
//     }
//   } catch (error: any) {
//     console.error("Error in Gemini API stream:", error);
//     if (error.message === "API_KEY_MISSING") {
//         yield "Gemini API Key is not configured. Please ensure the API_KEY environment variable is set.";
//     } else {
//         yield `${GEMINI_API_ERROR_MESSAGE} Details: ${error.message || DEFAULT_ERROR_MESSAGE}`;
//     }
//   }
// };
