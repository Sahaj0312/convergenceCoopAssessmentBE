import mongoose from "mongoose";

export const Todo = mongoose.model("Todo", {
  id: Number,
  description: String,
  urgency: Number,
  username: String,
  password: String,
});