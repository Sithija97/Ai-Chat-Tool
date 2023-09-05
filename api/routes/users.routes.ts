import express from "express";
import {
  changePassword,
  forgetPassword,
  getLoggedInStatus,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/index.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/getUser", protect, getUser);
userRouter.patch("/updateuser", protect, updateUser);
userRouter.get("/loggedin", getLoggedInStatus);
userRouter.patch("/changepassword", protect, changePassword);
userRouter.patch("/forgetpassword", protect, forgetPassword);

export { userRouter };
