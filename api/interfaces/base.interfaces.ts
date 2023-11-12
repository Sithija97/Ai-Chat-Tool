import { Request } from "express";
export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
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
  file?: IFile;
}
export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
