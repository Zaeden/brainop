import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const postRouter = Router();

//Route for creating new post: /api/posts
postRouter.post("/", isAuthenticated, PostController.createPost);

//Route for fetching all posts: /api/posts
postRouter.get("/", isAuthenticated, PostController.getPosts);

export default postRouter;
