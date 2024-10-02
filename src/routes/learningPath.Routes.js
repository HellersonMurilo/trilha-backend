const { Router } = require("express");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const learningPathController = require("../controller/learningPathController");


const learningPath = Router();

learningPath.post("/createTrail", decriptedJwt, (req, res) => {
    learningPathController.createTrail(req, res)
});

module.exports = learningPath