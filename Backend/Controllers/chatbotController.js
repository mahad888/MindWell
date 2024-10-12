import dotenv from 'dotenv';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Load environment variables from .env file
dotenv.config();

// Initialize the GoogleGenerativeAI with the Gemini API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Function to generate mental health-related chatbot responses
export const chatbot = async (req, res) => {
  const { message } = req.body;
  
  // Prepend a mental health-specific guide to every message
  const mentalHealthGuide = "You are a mental health assistant. Please respond with information and advice related to mental health, well-being, mindfulness, emotional regulation, mental illnesses, and self-care.";

  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",  // First message from user with a guide appended
          parts: [
            { text: `${mentalHealthGuide}\n\n${message}` },
          ]
        }
      ],
    });

    // Send the user message and get the chatbot response
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    // Log and send back the filtered mental health response
    console.log(responseText);
    res.json({ reply: responseText });

  } catch (error) {
    console.error('Error communicating with Gemini API:', error);

    let errorMessage;
    if (error.response) {
      errorMessage = `Error: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = 'No response received from Gemini';
    } else {
      errorMessage = `Request error: ${error.message}`;
    }

    res.status(500).send(errorMessage);
  }
};
