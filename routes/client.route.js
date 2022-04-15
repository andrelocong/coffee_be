import express from "express";
import { login, logout, logouts } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.delete("/logout", logout);
router.delete("/logouts", logouts);

export default router;
