const validateUser = (req, res, next) => {
  const { nome, idade, anoNascimento } = req.body;

  //NOME
  if (!nome || typeof nome !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "nome",
    });
  }

  // IDADE
  if (!idade || typeof idade !== 'number' ) {
    return res.status(400).json({
        msg: "Tipo de dado inválido",
        campo: "idade"
    })
  }

  //ANO NASCIMENTO
  if (anoNascimento || typeof anoNascimento !== 'string') {
    return res.status(400).json({
        msg:"Tipo de dado inválido",
        campo: "Ano nascimento"
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