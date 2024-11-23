const { Router } = require("express");
const { validateFields, validateIdTrilha } = require("../middlewares/moduleMiddleware");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const moduleController = require("../controller/moduleController");


const modules = Router()

modules.get('/', decriptedJwt, (req, res) => {
    moduleController.getTrails(req, res)
})

modules.post('/:idTrail/create', validateFields, decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.createModule(req, res)
})

modules.delete('')

module.exports = modules