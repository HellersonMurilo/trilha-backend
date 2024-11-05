const module = require('../models/module')

const validateFields = async (req, res, next) => {
    const { name_m, description_m, quantLessons } = req.body

    return next()
}

const validateIdModule = async (req, res, next) => {
    try {
        const moduleId = req.params.id

        //buscar o modulo para ver se existe
        const searchModule = await module.find

    } catch (error) {
        res.status(500).json({
            msg: 'Ocorreu um erro critico ao validar a trilha',
            error: error.message
        })
    }


}

module.exports = {
    validateFields
}