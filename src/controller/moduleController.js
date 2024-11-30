const LearningPath = require("../models/learningPath")
const Module = require("../models/module")

const moduleController = {
    createModule: async (req, res) => {

        const { nameModule, descriptionModule, quantLessons } = req.body
        const trailId = req.params.idTrail
        
        try {

            // Verificar se a trilha existe
            const trail = await LearningPath.findOne({ where: { trailId: trailId } });

            if (!trail) {
                return res.status(404).json({ msg: 'Trilha não encontrada.' });
            }

            //salvando na tabela de módulos
            const module = await Module.create({
                trailId: trailId,
                nameModule: nameModule,
                descriptionModule: descriptionModule,
                quantLessons: quantLessons
            })

            //Update na tabela Trilha
            const updateTrailModule = await LearningPath.update(
                { quantModules: trail.quantModules + 1 },
                { where: { trailId: trailId } }
            )

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
    getTrails: async (req, res) => {
        const trailId = req.params.idTrail
        try {
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
                err: error
            })
        }
    },
    deleteModule: async (req, res) => {
        const { idTrail, idModule } = req.params;

        if (!idTrail || !idModule) {
            return res.status(400).json({ msg: 'Parâmetros inválidos.' });
        }

        try {
            // Validar se a trilha e o módulo existem
            const trail = await LearningPath.findOne({ where: { trailId: idTrail } });
            if (!trail) {
                return res.status(404).json({ msg: 'Trilha não encontrada.' });
            }

            const moduleToDelete = await Module.findOne({ where: { module_id: idModule } });
            if (!moduleToDelete) {
                return res.status(404).json({ msg: 'Módulo não encontrado.' });
            }

            // Excluir o módulo
            await Module.destroy({ where: { module_id: idModule } });

            // Atualizar a quantidade de módulos
            const updatedTrail = await LearningPath.update(
                { quantModules: trail.quantModules - 1 },
                { where: { trailId: idTrail } }
            );

            return res.status(200).json({ msg: 'Módulo deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar o módulo:', error);
            return res.status(500).json({
                msg: 'Ocorreu um erro crítico ao deletar o módulo.',
                err: error.message,
            });
        }
    }
}

module.exports = moduleController