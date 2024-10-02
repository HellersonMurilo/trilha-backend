const LearningPath = require('../models/learningPath'); // Use o modelo correto para LearningPath
const User = require('../models/user');

const learningPathController = {
    createTrail: async (req, res) => {
        try {
            const { nameTrail, quantModules } = req.body;
            const emailUser = req.user.email;

            // Criar uma nova trilha na tabela LearningPath
            const createTrail = await LearningPath.create({
                userAdmin: emailUser, // Campo correto baseado no email do usuário
                nameTrail: nameTrail,
                quantModules: quantModules, // Campo correto, conforme o banco de dados
                dateCreation: new Date() // Define a data de criação
            });

            res.status(201).json({
                trail: `Trilha ${nameTrail} criada com sucesso!`,
                data: createTrail
            });

        } catch (error) {
            return res.status(500).json({
                msg: `Ocorreu um erro interno ao criar a trilha`,
                erro: error.message
            });
        }
    }
};

module.exports = learningPathController;
