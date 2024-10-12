import express from "express";
import { authenticate } from "../Authentications/verifyToken.js";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../Controllers/postController.js";
import { upload } from "../Middleware/multer.js";

const router = express.Router();

/* READ */
router.post("/feed/posts",upload,authenticate, createPost);
router.get("/feed/posts", authenticate, getFeedPosts);
router.get("/:userId/posts", authenticate, getUserPosts);

/* UPDATE */
router.patch("post/:id/like", authenticate, likePost);

export default router;