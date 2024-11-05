const { Router } = require("express");


const modules = Router()

modules.get('/listModules', (req, res) =>{
    res.send("toma aqui suas trilhas")
})

modules.post('/create/:id'), (req, res) =>{
    
}

module.exports = modules