import express from "express";
import * as dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/api/users", userRouter);
// app.use("/api/vehicles", vehicleRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});