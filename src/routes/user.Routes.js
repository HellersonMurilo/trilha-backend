const { Router } = require("express");
const userController = require("../controller/userController");

const { isAdmin } = require("../middlewares/authMiddleware");
const { validateEmailRememberPassword } = require("../middlewares/userMiddleware");

const userRoutes = Router();

// /api/user / GET -> Todos
// /api/user/32132121 GET -> Um
// /api/user/ POST -> Criar um
// /api/user/32343242 PUT -> Atualizar um
// /api/user/42874239 DELETE -> Deletar um

//USER
userRoutes.post("/", (req, res) => {
  userController.create(req, res);
});

userRoutes.get("/listusers", (req, res) => {
  userController.listenUser(req, res);
});

//atualizar senha
userRoutes.post("/rememberPassword", validateEmailRememberPassword, (req, res) => {
 userController.rememberPassword(req, res)
});

//ADMIN
userRoutes.post("/admin/createTrail", isAdmin, (req, res) => {
  res.send("opa");
});

module.exports = userRoutes;
