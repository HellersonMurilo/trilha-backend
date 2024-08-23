const bcrypt = require("bcrypt");

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

module.exports = hashPasswordMiddleware;
