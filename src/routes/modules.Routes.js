const { Router } = require("express");
const { validateFields, validateIdTrilha } = require("../middlewares/moduleMiddleware");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const moduleController = require("../controller/moduleController");


const modules = Router()

//LISTAR
modules.post('/modules/:idTrail', decriptedJwt, validateIdTrilha,(req, res) => {

    console.log(req.params.idTrail)
    moduleController.getTrails(req, res)
})

//CRIAR
modules.post('/create/:idTrail', validateFields, decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.createModule(req, res)
})

//DELETAR
modules.delete('/delete/:idTrail/:idModule', decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.deleteModule(req, res)
})

//ATUALIZAR
modules.put('/update/:idTrail/:idModule', decriptedJwt, validateIdTrilha, (req, res) => {
    moduleController.updateModule(req, res)
})

module.exports = modules