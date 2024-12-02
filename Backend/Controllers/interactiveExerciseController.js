
import InteractiveExerciseSchema from '../Models/InteractiveExerciseSchema.js';
import moment from 'moment';

export const storeData = async (req, res) => {
    try {
      const { prompts, mindfulVideo, mindfulAudio, breathVideo, breathAudio } = req.body;
  
      // Get today's date in 'YYYY-MM-DD' format
      const currentDate = moment().format('YYYY-MM-DD');
  
      // Prepare data to be updated/inserted
      let promptsArray = [];
      if (prompts) {
        if (typeof prompts === 'object' && !Array.isArray(prompts)) {
          promptsArray = Object.entries(prompts).map(([question, answer]) => ({
            question,
            answer: answer || ''
          }));
        } else if (Array.isArray(prompts)) {
          promptsArray = prompts.map(prompt => ({
            question: prompt.question || '',
            answer: prompt.answer || ''
          }));
        }
      }
  
      const updateData = {
        $setOnInsert: { date: currentDate }, // Set date only if the document is new
        $set: {
          ...(prompts && { prompts: promptsArray }),
          ...(mindfulVideo && {
            mindfulnessVideo: {
              type: mindfulVideo.type || '',
              allEmotions: mindfulVideo.allEmotions || []
            }
          }),
          ...(mindfulAudio && {
            mindfulnessAudio: {
              type: mindfulAudio.type || '',
              allEmotions: mindfulAudio.allEmotions || []
            }
          }),
          ...(breathVideo && {
            breathingVideo: {
              type: breathVideo.type || '',
              allEmotions: breathVideo.allEmotions || []
            }
          }),
          ...(breathAudio && {
            breathingAudio: {
              type: breathAudio.type || '',
              allEmotions: breathAudio.allEmotions || []
            }
          })
        }
      };
  
      // Find a document for today or create a new one if it doesn't exist
      const entry = await InteractiveExerciseSchema.findOneAndUpdate(
        { date: currentDate }, // Find by today's date
        updateData,
        { new: true, upsert: true } // Create a new document if none is found
      );
  
      res.status(201).json({ message: 'Data stored successfully!', entry });
    } catch (error) {
      console.error("Error storing data:", error);
      res.status(500).json({ message: "Error storing data", error: error.toString() });
    }
  };
  


  // TO GET INTERACTIVE EXERCISE DATA

  export const getData=async (req,res)=>{
    try{
      const data=await InteractiveExerciseSchema.find().sort({createdAt:-1});
      res.status(200).json(data);
    }
    catch(e){
      console.error(e);
      res.status(500).json({ error: 'Failed to fetch meditation data' });
    }
  };