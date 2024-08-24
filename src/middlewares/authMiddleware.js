const bcrypt = require("bcrypt");
const user = require("../models/user");

const authSignIn = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido",
      campo: "email",
    });
  }

  if (!senha || typeof senha !== "string") {
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

//validando se o e-mail ja existe no banco de dados
const validateEmailMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;

    const validarDuplicidade = await user.findOne({ where: { email } });

    if (validarDuplicidade) {
      return res.status(401).json({
        msg: "E-mail ja existente!",
      });
    }

    return next();
  } catch (error) {}
};

const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ message: "senha é obrigatoria." });
    }

    const saltRounds = 10;
    req.body.senha = await bcrypt.hash(senha, saltRounds);

    return next(); // Chama o próximo middleware ou a rota final
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const validateLoginMiddleware = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        msg: "Email e senha sao obrigatorios!",
      });
    }

    // Verifica se o usuário existe no banco de dados pelo email
    const usuario = await user.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ msg: "Email ou senha incorretos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ msg: "Email ou senha incorretos." });
    }

    req.user = usuario;
    return next();
  } catch (error) {
    return res.statu(500).json({
      msg: "Ocorreu um erro ao tentar fazer o login",
    });
  }
};

module.exports = {
  authSignIn,
  authSignUp,
  hashPasswordMiddleware,
  validateLoginMiddleware,
  validateEmailMiddleware,
};
