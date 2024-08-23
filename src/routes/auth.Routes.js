const { Router } = require("express");
const { authSignIn, authSignUp } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");
const hashPasswordMiddleware = require("../middlewares/hashMiddleware");
const validateLoginMiddleware = require("../middlewares/validateUserMiddleware");

const authRoutes = Router();

authRoutes.post("/signin", authSignIn, validateLoginMiddleware, (req, res) => {
  authController.signIn(req, res);
});

authRoutes.post("/signup", authSignUp, hashPasswordMiddleware, (req, res) => {
  authController.signUp(req, res);
});
module.exports = authRoutes;
