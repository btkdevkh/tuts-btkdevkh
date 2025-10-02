import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

router
  .get("/posts", getPosts)
  .get("/posts/:id", getPostById)
  .post("/posts", createPost)
  .put("/posts/:id", updatePost)
  .delete("/posts/:id", deletePost);

export default router;
