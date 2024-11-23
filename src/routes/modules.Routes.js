const { Router } = require("express");
const { validateFields, validateIdTrilha } = require("../middlewares/moduleMiddleware");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const moduleController = require("../controller/moduleController");


const modules = Router()

modules.post('/modules/:idTrail', decriptedJwt, validateIdTrilha,(req, res) => {

    console.log(req.params.idTrail)
    moduleController.getTrails(req, res)
})

modules.post('/:idTrail/create', validateFields, decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.createModule(req, res)
})

module.exports = modules