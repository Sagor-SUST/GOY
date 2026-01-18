
import { GoogleGenAI } from "@google/genai";
import { FunctionParams } from "../types.ts";

/**
 * Safely retrieves the API key from the environment.
 * In some browser environments, process.env might not be globally defined.
 */
const getApiKey = (): string => {
  try {
    // @ts-ignore
    return (typeof process !== 'undefined' && process.env?.API_KEY) || "";
  } catch {
    return "";
  }
};

export const getMathInsight = async (params: FunctionParams): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "API Key not found. Please ensure it is configured in your environment.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analyze the absolute value function f(x) = ${params.a}|x - ${params.h}| + ${params.k}.
    The parameters are:
    a = ${params.a} (Vertical stretch/compression and reflection)
    h = ${params.h} (Horizontal shift)
    k = ${params.k} (Vertical shift)

    Provide a very short, concise 2-sentence mathematical insight or observation about this specific function's graph properties (e.g., vertex location, opening direction, width). 
    Keep it professional and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    return response.text || "Move the sliders to see mathematical insights!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Exploring the properties of absolute value transformations. Keep adjusting the parameters to see more!";
  }
};
