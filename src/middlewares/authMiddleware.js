const authSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
        msg: "Tipo de dado inválido",
        campo: "email",
      });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
        msg: "Tipo de dado inválido",
        campo: "password"
    })
  }

  return next()
};

module.exports ={
    authSignIn
}