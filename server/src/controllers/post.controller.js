import Post from "../models/post.model.js";
import { postSchema } from "../validations/post.validation.js";
import vine, { errors } from "@vinejs/vine";

class PostController {
  //Controller for fetching all posts from db.
  static async getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
      const posts = await Post.find()
        .populate("postedBy", "username name profileImage")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (!posts) {
        return res.status(400).json({ message: "No posts to show" });
      }

      return res.status(200).json({ message: "Success", posts });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  //Controller for creating new post.
  static async createPost(req, res) {
    try {
      const body = req.body;
      const userId = req.user.id;
      const postBody = { ...body, postedBy: userId };
      const validator = vine.compile(postSchema);
      const payload = await validator.validate(postBody);

      const newPost = await Post.create(payload);
      if (!newPost) {
        return res.status(400).json({ message: "Some Error Occurred" });
      }
      return res.status(200).json({ message: "Post Created Successfully" });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res
          .status(400)
          .json({ type: "validation_error", message: error.messages });
      } else {
        console.log(error);
        return res.status(500).json({ message: error });
      }
    }
  }
}

export default PostController;
