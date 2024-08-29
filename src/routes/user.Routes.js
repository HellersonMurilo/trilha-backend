const { Router } = require("express");
const userController = require("../controller/userController");
const { validateUser } = require("../middlewares/userMiddleware");
const { isAdmin } = require("../middlewares/authMiddleware");

const userRoutes = Router();

// /api/user / GET -> Todos
// /api/user/32132121 GET -> Um
// /api/user/ POST -> Criar um
// /api/user/32343242 PUT -> Atualizar um
// /api/user/42874239 DELETE -> Deletar um

userRoutes.post("/", validateUser, (req, res) => {
  userController.create(req, res);
});

userRoutes.get("/listusers", (req, res) => {
  userController.listenUser(req, res);
});

//ADMIN
userRoutes.post("/admin/createTrail", (req, res) => {
  userController.createTrail(req, res);
});

module.exports = userRoutes;
