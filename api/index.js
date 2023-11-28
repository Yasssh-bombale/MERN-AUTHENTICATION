import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config({
  path: "config.env",
});
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MONGO connected successfully`))
  .catch((e) => console.log(`error while connecting to database ${e}`));

app.listen(8000, () => {
  console.log(`Server is successfully running on PORT:${process.env.PORT}`);
});
