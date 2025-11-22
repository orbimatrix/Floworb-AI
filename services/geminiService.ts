
import { GoogleGenAI, Modality } from "@google/genai";

// Removed conflicting global declaration for aistudio to prevent TS errors.
// We will access window.aistudio via type assertion.

const API_KEY = process.env.API_KEY || '';

// Initialize AI Client
let ai: GoogleGenAI | null = null;

const initAI = () => {
    try {
        if (process.env.API_KEY) {
            ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        } else {
            console.warn("API Key missing from process.env.API_KEY");
        }
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI", error);
    }
}

initAI();

export const GeminiService = {
  /**
   * Uses Gemini 2.5 Flash Image (Nano Banana) to edit an image or generate one from scratch.
   * Supports multiple inputs (images and prompts).
   */
  generateOrEditImageWithNano: async (prompts: string[], images: string[]): Promise<string> => {
    if (!ai) initAI();
    if (!ai) throw new Error("AI Service not initialized. Check API Key.");

    const parts: any[] = [];

    // Add images (Editing Mode or Multimodal Generation)
    images.forEach(img => {
        const cleanBase64 = img.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        parts.push({
            inlineData: {
                data: cleanBase64,
                mimeType: 'image/jpeg',
            },
        });
    });

    // Add text prompts
    const combinedPrompt = prompts.join("\n\n") || (images.length > 0 ? "Enhance this image" : "A creative abstract image");
    parts.push({
        text: combinedPrompt,
    });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: parts,
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const resultParts = response.candidates?.[0]?.content?.parts;
      if (!resultParts || resultParts.length === 0) {
        throw new Error("No image generated.");
      }

      const imagePart = resultParts.find(p => p.inlineData);
      
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
    if (!ai) initAI();
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
        });
        
        return response.text || "No response text generated.";
    } catch (error) {
        console.error("Gemini Pro API Error:", error);
        throw error;
    }
  },

  /**
   * Generates a video using Veo 3.1 (Fast Preview).
   * Supports Text-to-Video and Image-to-Video.
   */
  generateVideoWithVeo: async (prompt: string, base64Image?: string): Promise<string> => {
      // 1. Mandatory API Key Selection for Veo
      // Cast window to any to avoid global declaration merge conflicts with aistudio
      const win = window as any;
      if (win.aistudio) {
          const hasKey = await win.aistudio.hasSelectedApiKey();
          if (!hasKey) {
              await win.aistudio.openSelectKey();
          }
          // Re-init AI with potentially new key from environment (injected by aistudio)
          initAI();
      }

      if (!ai) throw new Error("AI Service not initialized.");

      let imageProp = undefined;
      if (base64Image) {
          const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
          imageProp = {
              imageBytes: cleanBase64,
              mimeType: 'image/png' // simplified for this demo
          };
      }

      try {
          // 2. Start Generation Operation
          let operation = await ai.models.generateVideos({
              model: 'veo-3.1-fast-generate-preview',
              prompt: prompt,
              image: imageProp,
              config: {
                  numberOfVideos: 1,
                  resolution: '720p',
                  aspectRatio: '16:9'
              }
          });

          // 3. Poll until done
          while (!operation.done) {
              await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
              operation = await ai.operations.getVideosOperation({ operation: operation });
          }

          // 4. Retrieve Video
          const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
          if (!downloadLink) throw new Error("Video generation failed or no URI returned.");

          // The response body contains MP4 bytes. Append API key.
          const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
          if (!videoResponse.ok) throw new Error("Failed to download generated video.");
          
          const videoBlob = await videoResponse.blob();
          return URL.createObjectURL(videoBlob);

      } catch (error: any) {
          console.error("Veo API Error:", error);
          // If key not found entity error, retry logic could go here, 
          // but for now we just throw to let the UI handle the error state.
          throw error;
      }
  },

  /**
   * Check if API is ready
   */
  isReady: () => !!ai && !!process.env.API_KEY
};
