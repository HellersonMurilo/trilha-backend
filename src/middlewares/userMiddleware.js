const User = require("../models/user");
const { sendEmail } = require("../service/emailService");

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

// LEMBRAR SENHA
const validateEmailRememberPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userEmail = await User.findOne({ where: { email: email } });

    if (!userEmail) {
      return res.status(401).json({
        msg: "Email não cadastrado",
      });
    }

    // Gerar Token
    const codeRemember = Math.floor(100000 + Math.random() * 900000);

    req.body.email = email;
    req.code = codeRemember;

    // Enviar e-mail com o código
    const subject = "Código de Recuperação de Senha";
    const text = `Seu código de recuperação é ${codeRemember}.`;
    await sendEmail(email, subject, text);

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Erro",
      error: error,
    });
  }
};

module.exports = {
  validateUser,
  validateEmailRememberPassword,
};
