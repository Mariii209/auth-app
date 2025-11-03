const { Router } = require("express");
const authControllers = require("../controllers/authCotrollers");

const router = Router();

router.post("/api/auth/signup", authControllers.signup_post);

router.post("/api/auth/login", authControllers.login_post);

module.exports = router;
