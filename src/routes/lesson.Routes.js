const express = require('express');
const multer = require('multer');
const { decriptedJwt } = require('../middlewares/authMiddleware');
const lessonController = require('../controller/lessonController');
const { validateVideoUpload } = require('../middlewares/moduleMiddleware');

const lesson = express.Router();

// Configuração do Multer para o upload temporário
const upload = multer({ dest: 'uploads/' });

//Rota de criação da lição
lesson.post('/create/:idTrail/:idModule', decriptedJwt, (req, res) => {
  lessonController.createLesson(req, res);
});

// Rota de upload de vídeo para a aula
lesson.post('/upload/:idTrail/:idModule/:idLesson', decriptedJwt, upload.single('video'), (req, res) => {
  lessonController.uploadLessonVideo(req, res);
});

// Rota para ver a lição
lesson.get('/view/:idTrail/:idModule/:idLesson', decriptedJwt, (req, res) => {
  lessonController.viewLesson(req, res);
});

module.exports = lesson;
