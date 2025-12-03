import { GoogleGenAI, Schema, Type } from "@google/genai";
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
    svg_flowchart: {
      type: Type.STRING,
      description: "Leave empty or return null, we are using mermaid_code now.",
    }
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

// Updated signature to accept apiKey as a second argument (matching App.tsx)
export const analyzeEmotionalMap = async (
  input: UserInput,
  providedApiKey?: string
): Promise<EmotionalMapAnalysis> => {
  // Use the provided key, or fallback to the Vite environment variable
  const apiKey = providedApiKey || import.meta.env.VITE_GEMINI_API_KEY;
  
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
      model: "gemini-1.5-flash", // Changed to 1.5-flash as 2.5 is not public yet
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an empathetic emotional intelligence expert. Your goal is to break down situations into emotional components, identify triggers, and suggest healing paths. Generate a Mermaid.js flowchart code that visualizes this journey using high-contrast, minimalist aesthetics."
      },
    });

    const text = response.text(); // In new SDK, text() is a method, not a property
    if (!text) {
      throw new Error("No response generated.");
    }

    try {
      // Clean and parse the response
      const parsed = JSON.parse(text) as EmotionalMapAnalysis;
      // Ensure svg_flowchart is at least an empty string if missing to satisfy types
      if (!parsed.svg_flowchart) parsed.svg_flowchart = ""; 
      return parsed;
    } catch {
      const parsed = JSON.parse(cleanJsonString(text)) as EmotionalMapAnalysis;
      if (!parsed.svg_flowchart) parsed.svg_flowchart = "";
      return parsed;
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to analyze the situation.");
  }
};
