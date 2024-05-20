const mongoose = require("mongoose");
const rooms = require("./rooms");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  email: { type: String, unique: true, trim: true, lowercase:true ,required: true },
  username: { type: String, unique: true, trim: true, lowercase:true ,required: true },
  password: { type: String, required: true },
  isDelete: { type: String, default: false, enum: [true, false] },
});

module.exports = mongoose.model("user", userSchema);
