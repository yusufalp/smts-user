import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/adminController.js";

const router = express.Router();

// DELETE /api/admin/users/:_id
// Deactivate or delete a user account.
router.delete("/users/:_id", deleteUser);

// GET /api/admin/users
// Retrieves all users.
router.get("/users", getAllUsers);

// GET /api/admin/users/:id
// Retrieve user account details.
router.get("/users/:_id", getUserById);

export default router;
