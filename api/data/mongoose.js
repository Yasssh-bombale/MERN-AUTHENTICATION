import mongoose from "mongoose";

export const MongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`MONGO connected successfully`))
    .catch((e) => console.log(`error while connecting to database ${e}`));
};
