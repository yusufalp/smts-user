import express from "express";

import {
  deleteUser,
  getUserById,
  loginUser,
  logoutUser,
  refreshAccessToken,
  signupUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// DELETE /users/:id
// Deactivate or delete a user account.
router.delete("/:_id", deleteUser);

// GET /users/:id
// Retrieve user account details.
router.get("/:_id", getUserById);

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
router.patch("/:_id", updateUser);

export default router;
