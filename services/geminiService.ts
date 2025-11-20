
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize AI Client
// Note: In a real SaaS, this might be proxied through a backend to hide the key, 
// but for this architecture we use client-side direct calls as per instructions.
let ai: GoogleGenAI | null = null;

try {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
        console.warn("API Key missing from process.env.API_KEY");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
}

export const GeminiService = {
  /**
   * Uses Gemini 2.5 Flash Image (Nano Banana) to edit an image based on a prompt.
   * Returns base64 image data.
   */
  editImageWithNano: async (base64Image: string, prompt: string): Promise<string> => {
    if (!ai) throw new Error("AI Service not initialized. Check API Key.");

    // Strip prefix if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: 'image/jpeg', // Standardize on jpeg for transmission
              },
            },
            {
              text: prompt || "Enhance this image",
            },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (!parts || parts.length === 0) {
        throw new Error("No image generated.");
      }

      const imagePart = parts.find(p => p.inlineData);
      
      if (imagePart && imagePart.inlineData) {
          return `data:image/png;base64,${imagePart.inlineData.data}`;
      }
      
      throw new Error("Model did not return valid inline image data.");

    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  /**
   * Uses Gemini 3 Pro for complex reasoning, analysis, or creative text generation.
   * Supports optional image input for multimodal reasoning.
   */
  analyzeWithGeminiPro: async (prompt: string, base64Image?: string): Promise<string> => {
    if (!ai) throw new Error("AI Service not initialized. Check API Key.");

    const parts: any[] = [];

    // Add image if present (Multimodal)
    if (base64Image) {
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        parts.push({
            inlineData: {
                data: cleanBase64,
                mimeType: 'image/jpeg',
            },
        });
    }

    // Add text prompt
    parts.push({ text: prompt });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: { parts },
            // Note: Thinking Config is for 2.5 series, not 3.0 Pro preview currently.
        });
        
        return response.text || "No response text generated.";
    } catch (error) {
        console.error("Gemini Pro API Error:", error);
        throw error;
    }
  },

  /**
   * Check if API is ready
   */
  isReady: () => !!ai && !!API_KEY
};
