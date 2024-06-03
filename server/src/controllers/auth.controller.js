import vine, { errors } from "@vinejs/vine";
import User from "../models/user.model.js";
import { registerSchema } from "../validations/auth.validation.js";
import { setToken } from "../utils/jwtToken.js";
import { resetPasswordSchema } from "../validations/resetPassword.validation.js";

class AuthController {
  //Controller logic for registering new user.
  static async signup(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      const userExists = await User.findOne({
        $or: [{ email: payload.email }, { username: payload.username }],
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "Email or Username already exists",
        });
      }

      const newUser = await User.create({
        ...payload,
      });

      const jwtPayload = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
      };

      const token = await setToken(jwtPayload);

      return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        access_token: `Bearer ${token}`,
      });
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

export default AuthController;
