import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const postSchema = vine.object({
  body: vine.string().optional(),
  image: vine.string().url(),
  postedBy: vine.string(),
});
