import { Router } from "express";
import { signup_post, login_post } from "../controllers/authControllers.js";

const router = Router();

router.post("/api/auth/signup", signup_post);
router.post("/api/auth/login", login_post);

export default router;
