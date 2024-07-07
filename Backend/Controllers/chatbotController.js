
import dotenv from 'dotenv';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

// Load environment variables from .env file
dotenv.config();

// Initialize the app


// Initialize the GoogleGenerativeAI with the Gemini API key


const genAI = new GoogleGenerativeAI("AIzaSyAAt1tq29tvugNLlqDYYr4wHlcm0W1MSAY");
      
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
    try{
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [
            {
              role: "user",
              parts: [
                {text: "hlelo"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Sawubona! \n\nHow can I help you today? \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "what is javascript\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "JavaScript is a powerful programming language that adds interactivity and dynamic behavior to web pages. Think of it as the brain behind the websites you use every day. Here's a breakdown of what JavaScript is and what it does:\n\n**What It Is:**\n\n* **A scripting language:** It's designed to run within web browsers, adding actions and features to websites.\n* **Dynamic:** Unlike static HTML, JavaScript lets you create interactive elements that respond to user actions, change content, and much more.\n* **Versatile:** It's not just for websites! JavaScript is used in server-side development (Node.js), mobile app development, game development, and more.\n\n**What It Does:**\n\n* **Makes websites interactive:**  JavaScript allows users to click buttons, scroll through content, play animations, and more.\n* **Adds dynamic content:**  It can fetch data from servers, update website content without reloading the entire page, and create personalized experiences.\n* **Validates user input:**  JavaScript ensures users enter correct data in forms, prevents errors, and improves user experience.\n* **Creates visual effects:**  It enables smooth transitions, animations, and interactive graphics that enhance website appeal.\n* **Connects to external APIs:** JavaScript can communicate with external services like Google Maps, Twitter, and more to integrate their functionality into your websites.\n\n**Examples of JavaScript in Action:**\n\n* **Dropdown menus:**  The ability to click a menu and reveal options.\n* **Interactive maps:** Zooming, dragging, and searching on a map.\n* **Online games:**  Interactive gameplay elements, animations, and scorekeeping.\n* **Forms validation:** Checking if emails are valid, passwords meet requirements, etc.\n\n**Learning JavaScript:**\n\nJavaScript is a popular and widely used language. There are many resources available online to learn it, including:\n\n* **Interactive tutorials:** Codecademy, FreeCodeCamp, Khan Academy\n* **Online courses:** Udemy, Coursera\n* **Documentation:** Mozilla Developer Network (MDN)\n* **Books:** \"Eloquent JavaScript\" by Marijn Haverbeke, \"JavaScript: The Good Parts\" by Douglas Crockford\n\nLearning JavaScript can open up a world of possibilities for creating engaging and dynamic websites, applications, and more. If you're interested in web development, it's a valuable skill to have! \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "hhy\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Hey there! How are you doing today? \n"},
              ],
            },
          ],
        });
      
        const result = await chatSession.sendMessage(message);
        console.log(result.response.text());
        res.json({ reply: result.response.text() });
    }
  
   catch (error) {
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
