import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateBabyNames(preferences: {
  gender: string | null;
  origin: string | null;
  vibe: string | null;
  meanings: string[];
}) {
  const prompt = `Generate a list of 10 baby names based on the following preferences:
  - Gender: ${preferences.gender || 'Any'}
  - Origin: ${preferences.origin || 'Any'}
  - Style/Vibe: ${preferences.vibe || 'Modern'}
  - Desired Meanings/Traits: ${preferences.meanings.join(', ') || 'Any'}

  For each name, provide:
  1. The name itself.
  2. A concise, beautiful meaning or story behind the name.
  3. The primary origin (e.g., Arabic, Latin, Japanese, etc.).

  The tone should be premium, warm, and helpful.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["names"],
          properties: {
            names: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "meaning", "origin"],
                properties: {
                  name: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  origin: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const result = JSON.parse(response.text);
    return result.names;
  } catch (error) {
    console.error("Error generating baby names:", error);
    // Fallback names if AI fails
    return [
      { name: 'Aurora', meaning: 'The goddess of dawn', origin: 'Latin' },
      { name: 'Kai', meaning: 'Sea', origin: 'Hawaiian' },
      { name: 'Elara', meaning: 'Moon of Jupiter', origin: 'Greek' },
    ];
  }
}
