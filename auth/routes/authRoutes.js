import { Router } from "express";
import {
  signup_post,
  login_post,
  home_get,
  logout_post,
  me_get,
} from "../controllers/authControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup_post); // User registration
router.post("/signin", login_post); // User login
router.get("/home", requireAuth, home_get); // Protected route example
router.post("/logout", logout_post); // User logout
router.get("/me", requireAuth, me_get); // Get current user info

export default router;
