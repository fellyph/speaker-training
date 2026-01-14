import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface TranslationParams {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  tone: 'formal' | 'informal';
}

export const generateScript = async ({
  text,
  sourceLanguage,
  targetLanguage,
  tone,
}: TranslationParams): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert speech writer and translator for PolyglotPitch.
    The user wants to prepare a presentation.
    
    Original Summary (in ${sourceLanguage}):
    "${text}"
    
    Task:
    1. Translate the summary and expand it into a structured speech/script suitable for a presentation.
    2. The target language is ${targetLanguage}.
    3. The tone of the speech must be ${tone}.
    4. Keep it engaging and professional.
    5. Return ONLY the translated script text, without any introductory or concluding remarks from you.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating script:", error);
    throw new Error("Failed to generate script with Gemini.");
  }
};

export interface AnalysisResult {
  pronunciationScore: number;
  grammarScore: number;
  fluencyScore: number;
  feedback: string;
  transcription: string;
}

export const analyzeSpeech = async (
  audioBlob: Blob,
  expectedScript: string,
  targetLanguage: string
): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Convert Blob to base64
  const base64AudioPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.readAsDataURL(audioBlob);
  });

  const base64Audio = await base64AudioPromise;

  const prompt = `
    You are an AI language coach for PolyglotPitch.
    The user has recorded a presentation in ${targetLanguage}.
    The expected script was:
    "${expectedScript}"
    
    Task:
    1. Transcribe the user's speech.
    2. Compare it with the expected script.
    3. Evaluate Pronunciation, Grammar, and Fluency on a scale of 0 to 100.
    4. Provide constructive feedback in Portuguese (pt-BR).
    
    Return the result ONLY as a JSON object with the following structure:
    {
      "pronunciationScore": number,
      "grammarScore": number,
      "fluencyScore": number,
      "feedback": "string",
      "transcription": "string"
    }
  `;

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: audioBlob.type,
          data: base64Audio
        }
      },
      { text: prompt }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON response (sometimes Gemini adds ```json ... ```)
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing speech:", error);
    throw new Error("Failed to analyze speech with Gemini.");
  }
};
