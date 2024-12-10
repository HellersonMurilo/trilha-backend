const fs = require('fs');
const { uploadToSpace, getPublicUrl, listVideosInLessonFolder } = require('../service/fileService');
const Lesson = require('../models/lessons');
const LearningPath = require('../models/learningPath');
const Module = require('../models/module');

const lessonController = {
  // Rota para upload de vídeo
  uploadLessonVideo: async (req, res) => {
    const file = req.file; // Arquivo enviado pelo multer
    const { idTrail, idModule, idLesson } = req.params; // Obtém os parâmetros da rota
    const key = `videos/${idTrail}/${idModule}/${idLesson}/${file.originalname}`;

    if (!file) {
      return res.status(400).send('Nenhum arquivo enviado.');
    }

    const tempPath = file.path;

    try {
      // Verifica se o arquivo existe no caminho temporário
      if (!fs.existsSync(tempPath)) {
        return res.status(400).send('Arquivo temporário não encontrado.');
      }

      // Enviar o vídeo para o Space
      const result = await uploadToSpace(tempPath, 'trailsync', key);

      // Limpar o arquivo temporário após o upload
      fs.unlinkSync(tempPath);

      res.status(200).json({
        msg: 'Upload concluído com sucesso!',
        location: result.Location, // URL do vídeo no DigitalOcean Spaces
      });
    } catch (error) {
      console.error('Erro ao enviar arquivo para o Space:', error);

      // Limpar o arquivo temporário em caso de erro
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

      res.status(500).json({
        msg: 'Erro ao processar o vídeo.',
        error: error.message,
      });
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
};

module.exports = lessonController;
