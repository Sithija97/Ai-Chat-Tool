import mongoose from "mongoose";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name: string;
  sku: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  image: object;
}
