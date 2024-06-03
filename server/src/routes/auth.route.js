import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

//Route for signup: /api/auth/signup
authRouter.post("/signup", AuthController.signup);

export default authRouter;
