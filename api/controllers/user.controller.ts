import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Token, User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.util.js";
import { CustomRequest } from "../interfaces/base.interfaces.js";
import { createHash, randomBytes } from "crypto";
import { sendEmail } from "../utils/sendEmail.util.js";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please fill in all required fields`);
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error(`Password must be upto 6 characters`);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    generateToken(res, _id);
    res.status(201).json({ _id, name, email, photo, phone, bio });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (passwordIsCorrect) {
    generateToken(res, user._id);
  }
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { _id, name, email, photo, phone, bio } = req.user;
  const user = { _id, name, email, photo, phone, bio };
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLoggedInStatus = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

const changePassword = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }

    if (!oldPassword || !password) {
      res.status(400);
      throw new Error("Please add old and new password");
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (user && passwordIsCorrect) {
      user.password = password;
      await user.save();
      res.status(200).send({ message: "Password changed successfully" });
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  }
);

const forgetPassword = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(400);
      throw new Error("User does not exists");
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    let resetToken = randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    const hashedToken = createHash("sha256").update(resetToken).digest("hex");
    console.log(hashedToken);

    await Token.create({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    });

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password</p>  
    <p>This reset link is valid for only 30minutes.</p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <p>Regards...</p>
    <p>Pinvent Team</p>
  `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
  }
);

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getLoggedInStatus,
  changePassword,
  forgetPassword,
};
