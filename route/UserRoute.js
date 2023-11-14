const express = require("express");
const UserController = require("../controller/UserController");
const verifyToken = require("../middleware/AuthMiddleWare");

const router = express.Router();

router.post("/login", UserController.login);
router.post("/signUp", UserController.signup);

module.exports = router;
