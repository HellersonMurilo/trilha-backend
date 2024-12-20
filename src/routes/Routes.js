const { Router } = require("express");
const userRoutes = require("./user.Routes");
const authRoutes = require("./auth.Routes");
const learningPathRoutes = require("./learningPath.Routes");
const modules = require("./modules.Routes");
const lesson = require("./lesson.Routes");

const router = Router();

//AUTH
router.use("/auth", authRoutes);

//USER
router.use("/", userRoutes);

//LEARNING PATH
router.use("/learningPath", learningPathRoutes);

    //MODULES
router.use('/modules', modules)

//LESSON
router.use('/lesson', lesson)

module.exports = router;
