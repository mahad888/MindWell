import mongoose from "mongoose";

const InteractiveExerciseVideosSchema = new mongoose.Schema({
    title: { type: String,  },
    video: {
        public_id: {
        type: String,
        required: true,
        },
        url: {
        type: String,
        required: true,
        },
    },
    description: { type: String,  },
    category: { type: String,  },

    }, { timestamps: true }); 

    export default mongoose.model('InteractiveExerciseVideo', InteractiveExerciseVideosSchema);