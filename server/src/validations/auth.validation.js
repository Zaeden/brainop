import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  username: vine.string().minLength(3).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32),
  name: vine.string().optional(),
  profileImage: vine.string().url().optional(),
});
