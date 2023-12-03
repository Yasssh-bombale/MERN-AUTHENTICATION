import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const home = (req, res) => {
  return res.send("user home");
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(ErrorHandler(401, "You can update only your account"));
  }
  try {
    let { username, email, profilePicture } = req.body;
    // console.log(req.body.username);
    console.log(username);
    console.log(email);
    console.log(profilePicture);
    console.log(req.body.password);
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password: req.body.password,
          profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res
      .status(200)
      .json({ message: "User updated successfully !", rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(ErrorHandler(401, "You can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully !",
    });
  } catch (error) {
    next(error);
  }
};
