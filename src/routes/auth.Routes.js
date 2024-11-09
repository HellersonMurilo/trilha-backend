const { Router } = require("express");
const {
  authSignIn,
  authSignUp,
  hashPasswordMiddleware,
  validateLoginMiddleware,
  validateEmailMiddleware,
  decriptedJwt,
} = require("../middlewares/authMiddleware");

const { authController } = require("../controller/authController");

const authRoutes = Router();

//LOGIN
authRoutes.post("/signin", authSignIn, validateLoginMiddleware, (req, res) => {
  authController.signIn(req, res);
});

//INSCREVA-SE
authRoutes.post(
  "/signup",
  authSignUp,
  validateEmailMiddleware,
  hashPasswordMiddleware,
  (req, res) => {
    authController.signUp(req, res);
  }
);

//LOGOUT
authRoutes.post('/logout', decriptedJwt, (req, res) => {
    authController.logout(req, res)
})

module.exports = authRoutes;
