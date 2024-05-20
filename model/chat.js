const { string } = require("joi");
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    room: { type: mongoose.Types.ObjectId, ref: "room", required: true },
    chat: { type: String, required: true },
    image: { type: String },
    date: {
      type: String,
      default: new Date().getDate().toString(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("chat", ChatSchema);
