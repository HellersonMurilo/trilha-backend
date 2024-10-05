const { Router } = require("express");
const { decriptedJwt } = require("../middlewares/authMiddleware");
const learningPathController = require("../controller/learningPathController");


const learningPath = Router();

learningPath.post("/createTrail", decriptedJwt, (req, res) => {
    learningPathController.createTrail(req, res)
});

learningPath.get("/trails", decriptedJwt, (req, res) => {
    learningPathController.getTrails(req, res)
})

module.exports = learningPath