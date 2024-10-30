const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;

const validateTrail = async (req, res, next) => {
    const { id } = req.params

    try {
        next()
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocorreu um erro ao validar a Trilha'
        })
    }
}

module.exports = {
    validateTrail
}