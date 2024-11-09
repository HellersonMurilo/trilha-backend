const { Router } = require("express");
const { validateFields, validateIdTrilha } = require("../middlewares/moduleMiddleware");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const moduleController = require("../controller/moduleController");


const modules = Router()

modules.get('/listModules', (req, res) => {
    res.send("toma aqui suas trilhas")
})

modules.post('/:idTrail/create', validateFields, decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.createModule(req, res)
})

module.exports = modules