const Module = require("../models/module")

const moduleController = {
    createModule: async (req, res) =>{
        try {
            const { nameModule, descriptionModule, quantLessons } = req.body
            const trailId = req.params.idTrail

            //salvando na tabela de módulos
            const module = await Module.create({
                trailId: trailId,
                nameModule: nameModule,
                descriptionModule: descriptionModule,
                quantLessons: quantLessons
            })

            return res.status(201).json({
                msg: 'Modulo criado com sucesso',
                module: module
            })

        } catch (error) {
            res.status(500).json({
                msg: 'Ocorreu um erro critico ao criar o modulo',
                error: error.message
            })
        }
    }
}

module.exports = moduleController