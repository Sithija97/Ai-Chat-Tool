import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../utils/fileUpload.js";
const productRouter = express.Router();

productRouter.post("/", protect, upload.single("image"), createProduct);
productRouter.get("/", protect, getProducts);
productRouter.get("/:id", protect, getProduct);
productRouter.patch("/:id", protect, upload.single("image"), updateProduct);
productRouter.delete("/:id", protect, deleteProduct);

export { productRouter };
