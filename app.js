// Require necessary modules
require('./socket')
const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const redis = require('redis');
const RedisStore = require('@goberman/connect-redis')(session);
const dotenv = require('dotenv')
const APIError = require('./utils/APIError');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Redis client
const redisClient = redis.createClient({
  legacyMode: true,
  port: 6379,
  host: '127.0.0.1',
});
redisClient.connect()


// Create Express application
const app = express();


// Set up session middleware
app.use(session({
  name:"username",
  store: new RedisStore({client : redisClient}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    persistent: true,
    rolling: true,
  },
}));

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('views'))
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Set up routes
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');

app.use('/', chatRoutes);
app.use('/', userRoutes);

app.use(function(err, req, res, next) {
  // Check if the error is an instance of APIError
  if (err instanceof APIError) {
      res.status(err.statusCode).json({ error: err.message });
  } else {
      // Handle other types of errors
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
