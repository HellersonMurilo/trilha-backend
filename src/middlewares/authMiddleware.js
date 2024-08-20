const authSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "email",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "password",
    });
  }

  return next();
};

const authSignUp = (req, res, next) => {
  const { nome, sobrenome, email, senha, nivelPerfil } = req.body;

  if (!nome || typeof nome !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "nome",
    });
  }

  if (!sobrenome || typeof sobrenome !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "sobrenome",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "email",
    });
  }

  if (!senha || typeof senha !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "senha",
    });
  }

  if (!nivelPerfil || typeof nivelPerfil !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "nivelPerfil",
    });
  }

  return next();
};

module.exports = {
  authSignIn,
  authSignUp,
};
