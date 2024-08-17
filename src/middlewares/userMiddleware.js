const validateUser = (req, res, next) => {
  const { nome, idade, anoNascimento } = req.body;
  if (!idade || !anoNascimento) {
    return res.status(400).json({
      msg: "campos faltando no usuario",
    });
  }

  if (!nome || typeof nome !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "nome",
    });
  }

  if (!idade || typeof idade !== 'number' ) {
    return res.status(400).json({
        msg: "Tipo de dado inválido",
        campo: "idade"
    })
  }

  return next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      msg: "parametro ID inválido ou faltando",
    });
  }

  return next()
};


module.exports = {
    validateUser,
    validateUserId
}