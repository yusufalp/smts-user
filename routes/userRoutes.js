import express from "express";

import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  signupUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// POST /users/login
// Authenticate a user and return a token.
router.post("/login", loginUser);

// POST /users/logout
// Invalidate the user session or token.
router.post("/logout", logoutUser);

// POST /users/refresh-token
// Refreshes and provides a new access token.
router.post("/refresh-token", refreshAccessToken);

// POST /users/signup
// Create a new user account.
router.post("/signup", signupUser);

// PATCH /users/:id
// Update user account details (e.g., username, password).
router.patch("/", updateUser);

export default router;
