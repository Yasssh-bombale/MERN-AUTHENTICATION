import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(ErrorHandler(401, "You need to login"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: "token is not valid" });
    }
    req.user = user;
    // console.log(req.user);
    next();
  });
};
