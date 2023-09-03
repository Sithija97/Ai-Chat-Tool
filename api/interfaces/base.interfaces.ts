import { Request } from "express";
export interface CustomRequest extends Request {
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    phone: string;
    bio: string;
  };
}
export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
