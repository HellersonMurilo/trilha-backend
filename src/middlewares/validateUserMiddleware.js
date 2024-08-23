const bcrypt = require("bcrypt");
const user = require("../models/user");

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


module.exports = validateLoginMiddleware