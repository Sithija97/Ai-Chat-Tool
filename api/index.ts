import express from "express";
import * as dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { userRouter, productRouter } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/index.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
