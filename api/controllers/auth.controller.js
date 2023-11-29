import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.findOne({ email });

    if (user) return next(ErrorHandler(401, "User already exist !"));

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
