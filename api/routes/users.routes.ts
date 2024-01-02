import express from "express";
import {
  changePassword,
  forgetPassword,
  getLoggedInStatus,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/index.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/getUser", protect, getUser);
userRouter.get("/loggedin", getLoggedInStatus);
userRouter.patch("/updateuser", protect, updateUser);
userRouter.patch("/change-password", protect, changePassword);
userRouter.post("/forgot-password", protect, forgetPassword);
userRouter.put("/reset-password/:resetToken", resetPassword);

export { userRouter };
