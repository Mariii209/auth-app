import { Router } from "express";
import {
  signup_post,
  login_post,
  home_get,
} from "../controllers/authControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup_post); // User registration
router.post("/signin", login_post); // User login
router.get("/home", requireAuth, home_get); // Protected route example

export default router;
