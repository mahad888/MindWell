import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    post: {
      url: String,
      public_id: {
        type: String,
      },
    },
    avatar: {
      url: String,
      public_id: {
        type: String,
      },
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
