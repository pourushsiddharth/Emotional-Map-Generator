# Emotional Map Generator

An AI-powered web application that analyzes personal situations to generate deep emotional insights, psychological interpretations, and visual emotional flowcharts using Google's Gemini API.


## 🚀 Overview

The **Emotional Map Generator** helps users understand their feelings by translating narrative descriptions of situations into structured emotional data. By leveraging the advanced reasoning capabilities of the **Google Gemini 2.5 Flash** model, the app provides a safe space for self-reflection, offering clarity through visualization and empathetic feedback.

## ✨ Key Features

*   **AI-Powered Analysis**: Deep text analysis to identify core emotions, triggers, and psychological patterns.
*   **Visual Flowcharts**: Auto-generated, interactive SVG flowcharts depicting the journey from initial emotions to resolution.
*   **Data Visualization**: Interactive bar charts (Recharts) showing the intensity of detected emotions.
*   **Personalized Insights**: Tailored psychological interpretations and actionable healing suggestions based on age, culture, and context.
*   **Secure API Usage**: Users bring their own Google Gemini API Key, which is stored locally in the browser for security.
*   **Export & Share**:
    *   Export analysis as **JSON** data.
    *   Print-friendly layout for **PDF** export.
    *   One-click **Sharing** summary.
*   **Responsive Design**: Fully responsive UI built with Tailwind CSS, featuring smooth animations and a modern aesthetic.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Integration**: Google GenAI SDK (`@google/genai`), Model: `gemini-2.5-flash`
*   **Visualization**: Recharts, Dynamic SVG generation
*   **Icons**: Google Material Symbols
*   **Fonts**: Google Sans, Roboto

## ⚙️ Setup & Installation

To run this project locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pourushsiddharth/emotional-map-generator.git
    cd emotional-map-generator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the port specified by Vite).

## 📖 Usage Guide

1.  **Configure API Key**:
    *   Click the "Set API Key" button in the top right corner.
    *   Enter your **Google Gemini API Key**. You can get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   The key is saved locally to your browser's `localStorage`.

2.  **Enter Details**:
    *   Describe a situation (e.g., an argument, a success, a confusing moment).
    *   Select your preferred language, age group, and country for culturally relevant insights.

3.  **Analyze**:
    *   Click "Generate My Map".
    *   Wait for the AI to process (usually takes 3-10 seconds).

4.  **Explore Results**:
    *   View the **Emotional Journey** flowchart (click fullscreen to zoom/pan).
    *   Read through **Detailed Analysis** (Transitions, Triggers, Interpretations).
    *   Check the **Core Emotions** chart.

## 🚀 Deployment (Vercel)

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and log in.
3.  Click **"Add New Project"**.
4.  Select your `emotional-map-generator` repository.
5.  Vercel will detect it is a **Vite** project.
6.  Click **Deploy**.

## 📂 Project Structure

```
├── components/
│   ├── AnalysisResults.tsx   # Displays charts, accordion details, and export options
│   ├── FlowchartFullscreen.tsx # Zoomable SVG viewer
│   ├── InputForm.tsx         # Main user input and API key modal
│   └── ProfileCard.tsx       # Floating author profile widget
├── services/
│   └── geminiService.ts      # Google GenAI integration and prompt engineering
├── App.tsx                   # Main application state manager
├── index.html                # Entry HTML with Tailwind config and global styles
├── index.tsx                 # React entry point
├── types.ts                  # TypeScript interfaces
└── metadata.json             # App metadata
```

## 👨‍💻 Author

**Pourush Siddharth**

*   **Portfolio**: [pourushsiddharth.in](https://pourushsiddharth.in/)
*   **LinkedIn**: [in/pourushsiddharth](https://www.linkedin.com/in/pourushsiddharth/)
*   **GitHub**: [github.com/pourushsiddharth](https://github.com/pourushsiddharth)
*   **Twitter**: [@PourushSidd](https://x.com/PourushSidd)

---

*Disclaimer: This tool is for informational and self-reflection purposes only. It is not a substitute for professional psychological advice, diagnosis, or treatment.*
