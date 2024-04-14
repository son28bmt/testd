const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const verifyToken = require("../middleware/verifyToken");


// Controller
router.post("/check-token", verifyToken, AuthController.checkToken);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
// verifyToken, AuthController.checkToken


module.exports = router;

