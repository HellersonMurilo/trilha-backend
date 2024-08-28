const { Router } = require("express");
const userRoutes = require("./user.Routes");
const authRoutes = require("./auth.Routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/", userRoutes);

module.exports = router;
