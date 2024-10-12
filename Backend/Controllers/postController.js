import Patient from "../Models/PaitentSchema.js";
import Post from "../Models/PostSchema.js";
import { uploadFilesToCloudinary } from "../utils/features.js";


/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { id, description } = req.body;
    
    // Fetch the user by ID
    const user = await Patient.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let postPicture = null;
    const file = req.file;
    
    // Check if a file was provided
    if (file) {
      const result = await uploadFilesToCloudinary([file]);
      console.log(result);
  
      if (!result || !result[0] || !result[0].public_id || !result[0].url) {
        return res.status(500).json({ status: false, message: "Failed to upload avatar" });
      }
  
      postPicture = {
        public_id: result[0].public_id,
        url: result[0].url,
      };
    }
    
    // Create a new post
    const newPost = new Post({
      userId: id,
      name: user?.name || "mahad gujjar",
      location: user?.location || "karachi",
      description,
      avatar: user.avatar,
      post: postPicture, // postPicture will be null if no image is uploaded
      likes: {},
      comments: [],
    });
    
    await newPost.save();
    
    // Return all posts after successfully creating a new one
    const posts = await Post.find();
    posts.reverse()
    res.status(201).json(posts);
    
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    post.reverse()

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};