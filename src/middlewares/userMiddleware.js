const validateUser = (req, res, next) => {
  const { nome_u, sobrenome, email, senha, nivelPerfil } = req.body;

  //NOME
  if (!nome_u || typeof nome_u !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "nome",
    });
  }

  // sobrenome
  if (!sobrenome || typeof sobrenome !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "sobrenome",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "email",
    });
  }
  if (!senha || typeof senha !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "senha",
    });
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

  return next();
};

module.exports = {
  validateUser,
  validateUserId,
};
