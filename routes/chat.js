const express = require("express");
const router = express.Router();
const { joinroom, register,freechat ,realtalk ,chat, getChat } = require("../controller/chatController");

const { isAuth } = require("../middleware/auth");
const { upload }  = require("../middleware/multer");

router.get("/", joinroom);
router.get("/register", register);
router.get("/freechat", isAuth, freechat);
router.get("/realtalk", isAuth, realtalk);

router.get("/allchat/:room", getChat);
router.post("/chat",upload.single('upload'),isAuth,chat);

module.exports = router;
