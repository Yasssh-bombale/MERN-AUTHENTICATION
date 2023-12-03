import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(ErrorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(ErrorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: hashedPassword, ...rest } = validUser._doc;
    return res
      .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, photo, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: hashedPassword, ...rest } = user._doc;
      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: email,
        password: hashedPassword,
        profilePicture: photo,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
