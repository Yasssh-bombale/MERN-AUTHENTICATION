import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRouter from "./router/user.router.js";
import authRouter from "./router/auth.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
config({
  path: "config.env",
});

const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MONGO connected successfully`))
  .catch((e) => console.log(`error while connecting to database ${e}`));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(8000, () => {
  console.log(`Server is successfully running on PORT:${process.env.PORT}`);
});

app.use(errorMiddleware);
