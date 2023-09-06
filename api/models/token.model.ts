import mongoose, { Schema, model } from "mongoose";
import { IToken } from "../interfaces/index.js";

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Token = model("Token", tokenSchema);
export { Token };
