import express from "express";

import {
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/signup", signup);

export default router;
