const { Router } = require("express");
const { authSignIn, authSignUp } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");

const authRoutes = Router();

authRoutes.post("/signin", authSignIn, (req, res) => {
  authController.signIn(req, res);
});

authRoutes.post("/signup", authSignUp, (req, res) => {
  authController.signUp(req, res);
});
module.exports = authRoutes;
