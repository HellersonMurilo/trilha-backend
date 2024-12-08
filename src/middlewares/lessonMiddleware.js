exports.validateVideoUpload = (req, res, next) => {
    if (!req.file) return res.status(400).send('Arquivo não encontrado.');
    if (req.file.mimetype !== 'video/mp4') return res.status(400).send('Apenas arquivos MP4 são permitidos.');
    if (req.file.size > 10000000000) {  // Exemplo: limite de 100MB
      return res.status(400).send('O arquivo é muito grande. O tamanho máximo permitido é 100MB.');
    }
    next();
  };
  