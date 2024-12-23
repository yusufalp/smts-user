import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";
import { decodeJwtToken, generateJwtToken } from "../utils/token.js";

export const deleteUser = async (req, res, next) => {};

export const getUserById = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new CustomError("User id is required ", 400);
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return res.status(200).json({
      success: { message: "User found successfully" },
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new CustomError("Missing credentials", 400);
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new CustomError("Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }

    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateJwtToken(user);
    const refreshToken = generateJwtToken(user, "refresh");

    const decoded = decodeJwtToken(accessToken);
    const expiresAt = decoded.exp;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: { message: "Login successful" },
      data: { accessToken, expiresAt },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: { message: "Logout successful" },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      throw new CustomError("Refresh token required", 400);
    }

    const decoded = decodeJwtToken(refreshToken);
    const { _id, username } = decoded;

    const user = { _id, username };

    if (!user) {
      throw new CustomError("Invalid refresh token", 400);
    }

    const accessToken = generateJwtToken(user);

    return res.status(200).json({
      success: { message: "Access token refreshed successfully" },
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const signupUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new CustomError("Missing required fields", 400);
    }

    // TODO: add more validations here, especially for username and password

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });

    await user.save();

    const accessToken = generateJwtToken(user);
    const refreshToken = generateJwtToken(user, "refresh");

    const decoded = decodeJwtToken(accessToken);
    const expiresAt = decoded.exp;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(201).json({
      success: { message: "User registered successfully" },
      data: { accessToken, expiresAt },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {};
