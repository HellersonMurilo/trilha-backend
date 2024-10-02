const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

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
  const { name, lastName, email, password } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "nome",
    });
  }

  if (!lastName || typeof lastName !== "string") {
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

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      msg: "Tipo de dado inválido ou nao preenchido",
      campo: "senha",
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
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

//GERAR O HASH
const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "senha é obrigatoria." });
    }

    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    return next();
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//VALIDAÇÃO DE LOGIN
const validateLoginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email e senha sao obrigatorios!",
      });
    }

    // Verifica se o usuário existe no banco de dados pelo email
    const returnUser = await user.findOne({ where: { email } });

    if (!returnUser) {
      return res.status(401).json({ msg: "usuario não existe." });
    }

    const senhaValida = await bcrypt.compare(password, returnUser.password);

    if (!senhaValida) {
      return res.status(401).json({ msg: "Email ou senha incorretos." });
    }

    //GERAR JWT
    const token = jwt.sign(
      { id: returnUser.userId, email: returnUser.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    req.user = returnUser;
    req.token = token;

    return next();
  } catch (error) {
    return res.status(500).json({
      msg: "Ocorreu um erro ao tentar fazer o login",
    });
  }
};

const decriptedJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "Token não fornecido",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);

    console.log(decoded)

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido ou expirado." });
  }
};

module.exports = {
  authSignIn,
  authSignUp,
  hashPasswordMiddleware,
  validateLoginMiddleware,
  validateEmailMiddleware,
  decriptedJwt,
};
