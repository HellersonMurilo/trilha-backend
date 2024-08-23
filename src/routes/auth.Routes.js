const { Router } = require("express");
const { authSignIn, authSignUp, hashPasswordMiddleware, validateLoginMiddleware } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");

const authRoutes = Router();

authRoutes.post("/signin", authSignIn, validateLoginMiddleware, (req, res) => {
  authController.signIn(req, res);
});

authRoutes.post("/signup", authSignUp, hashPasswordMiddleware, (req, res) => {
  authController.signUp(req, res);
});
module.exports = authRoutes;
