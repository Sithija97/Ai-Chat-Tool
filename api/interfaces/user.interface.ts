import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  bio: string;
}

export interface IToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}
