import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  bio: string;
}
