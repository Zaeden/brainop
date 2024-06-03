import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./db/index.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then((response) => {
    console.log(response);
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server running on Port No. ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
