import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const analyzeMessage = async (messageContent) => {
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english', // Replace with a more appropriate model
      inputs: messageContent,
    });

    // Check for specific keywords

    // Assuming the model gives labels as "positive", "negative", or other categories
    const isNegative = result[0].label === 'NEGATIVE' && result[0].score > 0.9; // Adjust the score threshold
    return isNegative ; // Return true if either condition is met
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    throw error; // Rethrow the error for handling it later
  }
};

// Controller function to handle the incoming request
export const analyzeTextController = async (req, res) => {
  const { message } = req.body; // Extract message from request body

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  try {
    const isCriticalMessage = await analyzeMessage(message);
    console.log('Is critical message:', isCriticalMessage);
    
    if (isCriticalMessage) {
      console.log('Alert: Suicidal or depressive thoughts detected in message:', message);
      // Trigger an alert or notify an admin
      // You can send an alert to admins or save it to the database
      return res.status(200).json({ message: 'Depressive thoughts detected in the message.' , isCriticalMessage: true});
    } else {
      return res.status(200).json({ message: 'No critical issues detected.' , isCriticalMessage: false});
    }
  } catch (error) {
    console.error('Error processing the message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
