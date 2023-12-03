import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRouter from "./router/user.router.js";
import authRouter from "./router/auth.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";
import { MongoConnection } from "./data/mongoose.js";
config({
  path: "config.env",
});
const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));
MongoConnection();

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(8000, () => {
  console.log(`Server is successfully running on PORT:${process.env.PORT}`);
});

app.use(errorMiddleware);
