const { Router } = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");

const learningPath = Router();

learningPath.post("/createTrail", isAdmin, (req, res) => {
    res.send('ta criada!')
});

module.exports = learningPath