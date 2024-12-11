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


export const chatbot = async (req, res) => {
  const { message } = req.body;
  
  // Prepend a mental health-specific guide to every message
  const mentalHealthGuide = "You are a mental health assistant in mindwell application.MindWell serves the purpose of articulating the ambitious vision and objectives encapsulated within the platform. The project seeks to introduce a pioneering digital solution that redefines the landscape of mental health and well-being. In the contemporary world, characterized by rapid lifestyles and heightened stress levels, the demand for accessible, personalized, and technologically advanced mental health support is more pressing than ever. MindWell aims to bridge this gap by offering a holistic ecosystem, integrating state-of-the-art technologies such as AI driven assessments, real-time emotion recognition, interactive exercises,community wall posts,mindful game and remote counseling. MindWell emerges from a critical examination of existing mental health applications, identifying their limitations. While several apps provide partial solutions, there is a distinct absence of a unified, all-encompassing platform. Current applications may lack personalization, real-time features, or the integration of AI-driven assessments. MindWell steps into this void by providing a user-centric platform, facilitating secure registration, personalized assessments, real-time emotion recognition, diverse interactive exercises, and professional counseling. The vision of the MindWell Platform is to craft a seamless and engaging user experience, empowering individuals to actively manage their mental well-being within a secure and supportive digital environment. Positioned at the forefront of mental health technology, MindWell represents a significant leap forward, offering a solution that transcends conventional approaches and caters to the diverse needs of individuals on their journey toward comprehensive mental wellness.. Please respond with information and advice related to mental health, well-being, mindfulness, emotional regulation, mental illnesses, and self-care also please answer briefly until the user asks you to answer explain.";

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
