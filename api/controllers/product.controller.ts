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

const getProducts = asyncHandler(async (req: CustomRequest, res: Response) => {
  const products = await Product.find({ user: req.user._id }).sort(
    "-createdAt"
  );
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req: CustomRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User is not authorized");
  }

  res.status(200).json(product);
});

const updateProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { name, description, sku, category, quantity, price } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User is not authorized");
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

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedProduct);
  }
);

const deleteProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User is not authorized");
    }

    await product.deleteOne();
    res.status(200).json(product);
  }
);

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
