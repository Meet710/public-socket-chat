const express = require("express");
const router = express.Router();
const { userRegister  ,login} = require("../controller/userController");
const { validateUser ,validateLogin} = require("../validation/chat");

router.post("/register", validateUser, userRegister);

router.post("/login/:room",validateLogin,login);

module.exports = router;
