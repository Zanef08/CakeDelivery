import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://zane:12345@cluster0.aodow2j.mongodb.net/cake-del")
    .then(() => console.log("DB connected"));
};
