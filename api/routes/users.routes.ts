import express from "express";
import {
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
userRouter.put("/updateUser", updateUser);
userRouter.get("/loggedIn", getLoggedInStatus);

export { userRouter };
