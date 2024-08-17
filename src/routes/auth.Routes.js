const { Router } = require("express");
const { authSignIn } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");

const authRoutes = Router();

authRoutes.post("/signin", authSignIn, (req, res) => {
    authController.signIn(req, res)
});

authRoutes.post('/signup', (req, res)=>{

})
module.exports = authRoutes;
