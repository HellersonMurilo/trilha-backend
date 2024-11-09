const LearningPath = require('../models/learningPath'); // Use o modelo correto para LearningPath
const User = require('../models/user');
const UserLearningPath = require('../models/intermediateUserLearning')

const learningPathController = {
    createTrail: async (req, res) => {
        try {
            const { nameTrail, quantModules } = req.body;
            const emailUser = req.user.email;

            // Buscando o usuário logado pelo e-mail
            const user = await User.findOne({
                where: { email: emailUser }
            });

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            // Criar uma nova trilha na tabela LearningPath
            const createTrail = await LearningPath.create({
                userAdmin: emailUser, // Campo correto baseado no e-mail do usuário
                nameTrail: nameTrail,
                quantModules: quantModules, // Campo correto conforme o banco de dados
                dateCreation: new Date() // Define a data de criação
            });

            // Gravar na tabela intermediária associando o usuário à trilha
            await UserLearningPath.create({
                userId: user.userId, // ID do usuário logado
                trailId: createTrail.trailId // ID da trilha criada
            });

            res.status(201).json({
                msg: `Trilha ${nameTrail} criada e associada com sucesso!`,
                data: createTrail
            });

        } catch (error) {
            return res.status(500).json({
                msg: `Ocorreu um erro interno ao criar a trilha`,
                erro: error.message
            });
        }
    },

    getTrails: async (req, res) => {
        try {
            const user = req.user.email
            const trails = await LearningPath.findAll({
                where: {
                    userAdmin: user
                }
            })
            if (!trails) {
                return res.status(200).json({
                    msg: 'Nenhuma Trilha encontrada'
                })
            }

            return res.status(200).json({
                data: trails
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro critico ao puxar as trilhas',
                erro: error
            })
        }
    },

    deleteTrail: async (req, res) => {
        try {
            const trailId = req.params.id;

            const email = req.user.email;

            // Verificar se req.user e req.user.email estão presentes
            if (!req.user || !req.user.email) {
                return res.status(400).json({ msg: 'Usuário não autenticado' });
            }

            // Buscar o usuário no banco
            const user = await User.findOne({
                where: { email: email }
            });

            //Validando se o usuario existe
            if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

            // Buscar a trilha na tabela intermediária
            const userTrail = await UserLearningPath.findOne({
                where: { trailId, userId: user.userId },
            });

            //Validando se a trilha criada existe
            if (!userTrail) return res.status(404).json({ msg: 'Trilha não encontrada ou não associada ao usuário' });

            // Deletar a trilha na tabela intermediária e na tabela principal
            await userTrail.destroy();
            await LearningPath.destroy({
                where: { trailId: trailId }
            });

            return res.status(200).send('Trilha deletada com sucesso!');
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro crítico ao deletar a trilha',
                erro: error.message,
            });
        }
    }

};

module.exports = learningPathController;
