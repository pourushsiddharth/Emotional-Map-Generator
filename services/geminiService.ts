
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EmotionalMapAnalysis, UserInput } from "../types";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    core_emotions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          emotion: { type: Type.STRING, description: "Name of the emotion" },
          intensity: {
            type: Type.INTEGER,
            description: "Intensity from 0 to 100",
          },
        },
        required: ["emotion", "intensity"],
      },
      description: "List of core emotions identified in the situation.",
    },
    emotional_transitions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          from: { type: Type.STRING },
          to: { type: Type.STRING },
          description: {
            type: Type.STRING,
            description: "Explanation of the transition",
          },
        },
        required: ["from", "to", "description"],
      },
      description: "The journey from one emotional state to another.",
    },
    triggers: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key triggers identified in the text.",
    },
    psychological_interpretations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Insights into why the user might be feeling this way.",
    },
    healing_suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable advice for the user.",
    },
    empathetic_message: {
      type: Type.STRING,
      description: "A kind, supportive message summarizing the analysis.",
    },
    mermaid_code: {
      type: Type.STRING,
      description: `A valid Mermaid.js flowchart string.
      
      RULES:
      1. START with "graph LR"
      2. DEFINE CLASSES - HIGH CONTRAST MINIMALIST:
         classDef negative fill:#fff0f0,stroke:#d32f2f,stroke-width:3px,color:#000000;
         classDef neutral fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000;
         classDef resolution fill:#f0f7ff,stroke:#000000,stroke-width:3px,color:#000000;
      3. SYNTAX:
         Trigger(("Trigger")) --> Emotion1("Emotion")
         Emotion1 --> Emotion2("Emotion")
         Emotion2 --> Resolution{{"Resolution"}}
      4. APPLY CLASSES:
         class Trigger negative;
         class Emotion1,Emotion2 neutral;
         class Resolution resolution;
      5. LABELS:
         Keep labels SHORT (max 3 words). Use EMOJIS.
      6. Return ONLY the code.
      `,
    },
  },
  required: [
    "core_emotions",
    "emotional_transitions",
    "triggers",
    "psychological_interpretations",
    "healing_suggestions",
    "empathetic_message",
    "mermaid_code",
  ],
};

const cleanJsonString = (str: string): string => {
  let cleaned = str.replace(/```json/g, "").replace(/```/g, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned;
};

export const analyzeEmotionalMap = async (
  input: UserInput
): Promise<EmotionalMapAnalysis> => {
  // Use the API key provided in the input, fallback to env if not present (dev mode)
  const apiKey = input.apiKey || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please enter your Google Gemini API Key in the settings.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following situation to generate an emotional map.
    Situation: "${input.situation}"
    User Context: Age ${input.age}, Location ${input.country}, Language Preference: ${input.language}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an empathetic emotional intelligence expert. Your goal is to break down situations into emotional components, identify triggers, and suggest healing paths. Generate a Mermaid.js flowchart code that visualizes this journey using high-contrast, minimalist aesthetics."
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated.");
    }

    try {
      return JSON.parse(text) as EmotionalMapAnalysis;
    } catch {
      return JSON.parse(cleanJsonString(text)) as EmotionalMapAnalysis;
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to analyze the situation.");
  }
};
