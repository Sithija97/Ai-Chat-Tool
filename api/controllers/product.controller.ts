import * as dotenv from "dotenv";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";
import { CustomRequest } from "../interfaces/base.interfaces.js";
import { fileSizeFormatter, upload } from "../utils/fileUpload.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { name, description, sku, category, quantity, price } = req.body;

    if (!name || !description || !category || !quantity || !price) {
      res.status(400);
      throw new Error("Please fill the mandatory fields");
    }

    /* file uploading */
    let fileData = {};

    if (req.file) {
      /* save file to cloudinary */
      let uploadedFile;

      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "InventoMate App",
          resource_type: "image",
        });
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Error uploading file to Cloudinary");
      }

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }

    const product = await Product.create({
      user: req.user._id,
      name,
      description,
      sku,
      category,
      quantity,
      price,
      image: fileData,
    });

    res.status(201).json(product);
  }
);

export { createProduct };
