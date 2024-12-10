const fs = require('fs');
const { uploadToSpace, getPublicUrl, listVideosInLessonFolder } = require('../service/fileService');
const Lesson = require('../models/lessons');
const LearningPath = require('../models/learningPath');
const Module = require('../models/module');

const lessonController = {
    // Rota para upload de vídeo
    uploadLessonVideo: async (req, res) => {
        console.log('Início do upload');
        console.log('Parâmetros da rota:', req.params);
        console.log('Arquivo recebido:', req.file);

        const file = req.file;
        if (!file) {
            console.error('Nenhum arquivo foi enviado pelo cliente.');
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        const { idTrail, idModule, idLesson } = req.params;
        const key = `videos/${idTrail}/${idModule}/${idLesson}/${file.originalname}`;
        const tempPath = file.path;

        try {
            console.log('Caminho do arquivo temporário:', tempPath);

            if (!fs.existsSync(tempPath)) {
                console.error('Arquivo temporário não encontrado.');
                return res.status(400).send('Arquivo temporário não encontrado.');
            }

            const result = await uploadToSpace(tempPath, 'trailsync', key);

            fs.unlinkSync(tempPath); // Limpa o arquivo temporário

            console.log('Upload bem-sucedido:', result.Location);

            res.status(200).json({
                msg: 'Upload concluído com sucesso!',
                location: result.Location,
            });
        } catch (error) {
            console.error('Erro durante o upload:', error.message);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            res.status(500).json({ msg: 'Erro ao processar o vídeo.', error: error.message });
        }
    },

    // Rota para criar uma nova lição
    createLesson: async (req, res) => {
        const { idTrail, idModule } = req.params;

        try {
            // Validar se a trilha e o módulo existem
            const trail = await LearningPath.findOne({ where: { trailId: idTrail } });
            if (!trail) {
                return res.status(404).json({ msg: 'Trilha não encontrada.' });
            }

            const moduleLesson = await Module.findOne({ where: { module_id: idModule } });
            if (!moduleLesson) {
                return res.status(404).json({ msg: 'Módulo não encontrado.' });
            }

            const lesson = await Lesson.create({
                module_id: idModule,
                title_lesson: req.body.title_lesson,
                text_lesson: req.body.text_lesson,
            });

            return res.status(201).json({
                msg: 'Lição criada com sucesso!',
                lesson: lesson,
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro crítico ao criar a lição',
                err: error.message,
            });
        }
    },

    // Rota para visualizar a lição
    viewLesson: async (req, res) => {
        const { idTrail, idModule, idLesson } = req.params;

        try {
            // Validar se a trilha, o módulo e a lição existem
            const trail = await LearningPath.findOne({ where: { trailId: idTrail } });
            if (!trail) {
                return res.status(404).json({ msg: 'Trilha não encontrada.' });
            }

            const moduleLesson = await Module.findOne({ where: { module_id: idModule } });
            if (!moduleLesson) {
                return res.status(404).json({ msg: 'Módulo não encontrado.' });
            }

            const lesson = await Lesson.findOne({ where: { licao_id: idLesson } });
            if (!lesson) {
                return res.status(404).json({ msg: 'Lição não encontrada.' });
            }

            // Listar todos os vídeos na pasta da lição
            const videoUrls = await listVideosInLessonFolder(idTrail, idModule, idLesson);

            return res.status(200).json({
                lesson: lesson,
                videoUrls: videoUrls, // Retorna todas as URLs dos vídeos
            });
        } catch (error) {
            console.error('Erro ao visualizar lição:', error);
            return res.status(500).json({
                msg: 'Ocorreu um erro crítico ao listar a lição',
                err: error.message,
            });
        }
    },
    listLesson: async (req, res) => {
        const { idTrail, idModule } = req.params;

        const lessons = await Lesson.findAll({
            where: { module_id: idModule }
        })

        if (!lessons) {
            return res.status(404).json({
                msg: 'Nenhuma lição encontrada'
            })
        } else {
            return res.status(200).json({
                msg: 'Lessons',
                lessons: lessons
            })
        } {

        }

    }
};

module.exports = lessonController;
