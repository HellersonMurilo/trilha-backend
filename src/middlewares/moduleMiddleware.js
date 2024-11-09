const Module = require('../models/module')
const UserLearningPath = require('../models/intermediateUserLearning')
const userLearningPath = require('../models/intermediateUserLearning')

const validateFields = async (req, res, next) => {
    const { nameModule, descriptionModule, quantLessons } = req.body
    const idTrail = req.params.idTrail

    if (!nameModule || typeof nameModule !== 'string') {
        return res.status(400).json({
            msg: "Tipo de dado inválido",
            campo: "Module Name",
        });
    }

    if (!descriptionModule || typeof descriptionModule !== 'string') {
        return res.status(400).json({
            msg: "Tipo de dado inválido",
            campo: "Module Description",
        });
    }

    if (!quantLessons || typeof quantLessons !== 'number') {
        return res.status(400).json({
            msg: "Tipo de dado inválido",
            campo: "Quant Lessons",
        });
    }

    if (!idTrail) {
        return res.status(400).json({
            msg: "Trilha nao informada",
            campo: "Id Trail",
        });
    }

    return next()
}

//Valida se a trilha informada é a do usuario
const validateIdTrilha = async (req, res, next) => {
    try {
        const trailId = req.params.idTrail

        //capturando o ID do usuario com base no JWT
        const userId = req.user.id

        //buscando a trilha no banco de tabelas intermediarias
        const dataTrail = await userLearningPath.findOne({
            where: {
                trailId: trailId
            }
        })

        //validando se o usuario é da trilha que esta no ID
        if (!dataTrail) {
            return res.status(400).json({
                msg: 'Trilha não encontrada'
            })
        }

        if (dataTrail.userId != userId) {
            return res.status(400).json({
                msg: 'usuario nao autorizado a essa trilha'
            })
        }

        return next()

    } catch (error) {
        res.status(500).json({
            msg: 'Ocorreu um erro critico ao validar a trilha',
            error: error.message
        })
    }
}

module.exports = {
    validateFields, validateIdTrilha
}