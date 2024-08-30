const validator = require("validator");

const validateUserData = (userData) => {
  const error = [];

  //Email
  if (!validator.isEmail(userData.email)) {
    errors.push("Invalid email format");
  }

  //Senha
  if (!validator.isLength(userData.password, { min: 6 })) {
    errors.push("Password must be at least 6 characters long");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
    validateUserData
};
