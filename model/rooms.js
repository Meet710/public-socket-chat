const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true,minLength:3 ,maxLength:15 },
})
module.exports = new mongoose.model('room',roomSchema)