const { Router } = require("express");
const userController = require("../controller/userController");
const { validateUser, validateUserId } = require("../middlewares/userMiddleware");

const userRoutes = Router();

// /api/user / GET -> Todos
// /api/user/32132121 GET -> Um
// /api/user/ POST -> Criar um
// /api/user/32343242 PUT -> Atualizar um
// /api/user/42874239 DELETE -> Deletar um

userRoutes.post("/", validateUser, (req, res) => {
  userController.create(req, res)
});

userRoutes.get('/listUsers', (req, res)=>{
    userController.listenUser(req,res)
})

module.exports = userRoutes;
