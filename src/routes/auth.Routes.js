const { Router } = require("express");
const {
  authSignIn,
  authSignUp,
  hashPasswordMiddleware,
  validateLoginMiddleware,
  validateEmailMiddleware,
} = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");

const authRoutes = Router();

authRoutes.post("/signin", authSignIn, validateLoginMiddleware, (req, res) => {
  authController.signIn(req, res);
});

authRoutes.post(
  "/signup",
  authSignUp,
  validateEmailMiddleware,
  hashPasswordMiddleware,
  (req, res) => {
    authController.signUp(req, res);
  }
);
module.exports = authRoutes;
