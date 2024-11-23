const userLearningPath = require("../models/intermediateUserLearning")
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
    },
    getTrails: async (req, res) =>{
        const user = req.user.id
        try {
            //buscando os dados da intermediaria
            const dataUser = await userLearningPath.findOne({
                where:{
                    userId: user
                }
            })

            //salvando o trailId
            let trailId = dataUser.trailId
            
            //buscando a trilha na tabela de modulos
            const listModules = await Module.findAll({
                where: {
                    trailId: trailId
                }
            })

            return res.status(200).json({
                modules: listModules
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro critico ao listar as Trilhas',
                err: error.message
            })
        }
    }
}

module.exports = moduleController