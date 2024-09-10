const User = require("../models/user");
const { sendEmail } = require("../service/emailService");

const generateCode = async (req, res, next) => {
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

    // Salvar o código e o tempo de expiração no banco de dados
    const expirationTime = Date.now() + 15 * 60 * 1000; // 15 minutos de validade

    await User.update(
      { recoveryCode: codeRemember, recoveryCodeExpiration: expirationTime },
      { where: { email: email } }
    );

    req.body.user = userEmail;
    req.code = codeRemember;

    // Enviar e-mail com o código
    const subject = "Código de Recuperação de Senha";
    const replacements = {
      code: codeRemember,
      email: userEmail.nome,
    };
    await sendEmail(email, subject, "rememberPassword.html", replacements);

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Erro",
      error: error,
    });
  }
};

const validateResetCode = async (req, res, next) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["email", "recoveryCode", "recoveryCodeExpiration"],
    });

    if (!user) {
      return res.status(401).json({ msg: "Usuário não encontrado." });
    }

    // Verificar se o código é válido e não expirou
    if (user.recoveryCode != code || Date.now() > user.recoveryCodeExpiration) {
      console.log(user.recoveryCode);
      console.log(user.recoveryCodeExpiration);
      return res.status(400).json({ msg: "Código inválido ou expirado." });
    }

    req.body.user = user

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Erro ao validar o código.",
      error: error,
    });
  }
};

module.exports = {
  generateCode,
  validateResetCode,
};
