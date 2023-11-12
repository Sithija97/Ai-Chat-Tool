import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../utils/fileUpload.js";
const productRouter = express.Router();

productRouter.post("/", protect, upload.single("image"), createProduct);

export { productRouter };
