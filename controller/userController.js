const USER = require("../model/user");
const ROOM = require("../model/rooms");
const bcrypt = require("bcrypt");
const  APIError = require("../utils/APIError");

exports.userRegister = async (req, res, next) => {
  try {
    const { name, email , username ,password} = req.body;
    
    const existingUser = await USER.findOne({
      $or: [
          { email: email },
          { username: username }
      ]
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
          throw new APIError("User with this email already exists", 400);
      }
      if(existingUser.username===username)
      {
          throw new APIError("User with this username already exists",400);
      }
  }
    const newUser = new USER({
      name: name,
      email: email,
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

   res.status(200).json({ message: "User created successfully" })

  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const  room = req.params.room
    const { username, password } = req.body;
    const user = await USER.findOne({ username: username });
    if (!user) {
      throw new APIError("User not found", 404);

    }

    console.log(room)
    const chatRoom = await ROOM.findOne({ name: room });
    if (!chatRoom) {
      throw new APIError("Room not found", 404);
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new APIError("Invalid Password", 400);
    }
    req.session.username = user.username;
    res.json({redirectUrl : chatRoom.name , username: user.username})
  }
  catch(error) {
    next(error)
  }
}

