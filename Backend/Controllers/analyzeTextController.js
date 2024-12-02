import { HfInference } from '@huggingface/inference';
import Post from '../Models/PostSchema.js';
import { Message } from '../Models/MessageSchema.js';


const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const analyzeMessage = async (messageContent) => {
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english', 
      inputs: messageContent,
    });

    // Assuming the model gives labels as "positive", "negative", or other categories
    const isNegative = result[0].label === 'NEGATIVE' && result[0].score > 0.9; // Adjust the score threshold
    return isNegative ; // Return true if either condition is met
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    throw error; // Rethrow the error for handling it later
  }
};


export const analyzeTextController = async (req, res) => {
  const { message, title } = req.body; // Extract `message` and `type` from request body
  console.log('Message:', message, 'title:', title);

  // Validate required fields
  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  if (!title) {
    return res.status(400).json({ error: 'Message title is required.' });
  }

  try {
    // Analyze the message for critical content
    const isCriticalMessage = await analyzeMessage(message);
    console.log('Is critical message:', isCriticalMessage);

    if (isCriticalMessage) {
      console.log('Alert: Suicidal or depressive thoughts detected in message:', message);

      if (title === 'Post') {
        // Update or save the post in the database
        const post = await Post.findOneAndUpdate(
          { description: message }, // Query to find the post
          { postType: 'negative' }, // Update fields
          { new: true, upsert: true } // Options: return updated document, create if not found
        );

        console.log('Updated or created post:', post);

        // Respond with a critical message alert
        return res.status(200).json({
          message: 'Depressive thoughts detected.',
          isCriticalMessage: true,
          post,
        });
      } else if (title === 'Message') {
        // Update or save the message in the database
        const savedMessage = await Message.findOneAndUpdate(
          { content: message }, // Query to find the message
          { messageType: 'negative' }, // Update fields
          { new: true, upsert: true } // Options: return updated document, create if not found
        );

        console.log('Updated or created message:', savedMessage);

        // Respond with a critical message alert
        return res.status(200).json({
          message: 'Depressive thoughts detected.',
          isCriticalMessage: true,
          savedMessage,
        });
      }
    }

    // Respond if no critical message is detected
    return res.status(200).json({
      message: 'No critical issues detected.',
      isCriticalMessage: false,
    });
  } catch (error) {
    console.error('Error processing the message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
