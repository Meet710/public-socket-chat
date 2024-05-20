const USER = require("../model/user");
const ROOM = require("../model/rooms");
const CHAT = require("../model/chat");
const moment = require("moment");
const APIError = require("../utils/APIError");

let image = ""
exports.joinroom = (req, res, next) => {
  try {
      res.render('advanceRoom')
  } catch (error) {
    next(error)
  }
}

exports.freechat = (req, res, next) => {
  try {
    res.render('freechat',{sessionActive : req.session.username , image: image})
  } catch (error) {
    next(error)
  }
}
exports.realtalk = (req, res, next) => {
  try {
    res.render('realtalk',{sessionActive : req.session.username})
  } catch (error) {
    next(error)
  }
}
exports.register = (req, res, next) => {
  try {
    res.render('registration')
  } catch (error) {
    next(error)
  }
}

exports.chat = async (req, res, next) => {
  try {
    const { room, chat, username, date } = req.body;

    const user = await USER.findOne({ username: username });

    if (!user) {
      throw new APIError("user not found", 404);
    }
    const chatroom = await ROOM.findOne({ name: room });
    if (!chatroom) {
      throw new APIError("room not found", 404);
    }
    
    const newChat = new CHAT({
      user: user._id,
      room: chatroom._id,
      chat: chat,
      date: date,
    });

    await newChat.save();

    if (req.file) {
      newChat.image = req.file.filename;
      image = req.file.filename
      await newChat.save();
    }

    res.status(200).send(newChat);
  } catch (error) {
    next(error);
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const room = req.params.room;
    const startOfToday =
      moment().startOf("day").format("MMM D, YYYY") + ", 00:00";
    const endOfToday = moment().endOf("day").format("MMM D, YYYY") + ", 23:59";

    console.log(startOfToday);
    const chat = await CHAT.find({
      date: { $gte: startOfToday, $lt: endOfToday },
    }).populate([
      {
        path: "user",
        model: "user",
        select: "username",
      },
      {
        path: "room",
        model: "room",
        select: "name",
        match: { name: { $eq: room } },
      },
    ]);
    const filteredChat = chat.filter((entry) => entry.room !== null);
    res.status(200).send(filteredChat);
  } catch (error) {
    next(error);
  }
};
