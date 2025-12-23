const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config({ path: "./app/config/.env" });
var morgan = require("morgan");
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
const api_prefix = process.env.API_PREFIX;

const sequelize = require("./app/config/db");

const { User } = require("./app/models/User.model");

const userRouter = require("./app/routes/userRoute.routes");



// MiddleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware for handling cookies

// Routes


app.use(`${api_prefix}/user`, userRouter);

//

const { v4: uuidv4 } = require('uuid');

const sessions = {}; 



// Middleware to check if the request has a valid session
app.use((req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId && sessions[sessionId]) {
    req.session = sessions[sessionId];
  } else {
    req.session = {};
  }
  next();
});



//
sequelize
  .sync({ 
    force: true, cascade: true 

  })  // Add cascade
  //.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database synchronization error: ", err);
  });


  //

  app.post(`${api_prefix}/user/login`, async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({
        where: {
          username,
          password, // Note: In a real application, passwords should be hashed and compared securely
        },
      });
  
      if (user) {
        // Generate a session ID
        const sessionId = uuidv4();
  
        // Store user session in memory
        sessions[sessionId] = {
          userId: user.id, // Assuming you have a unique identifier for the user in your User model
        };
  
        // Set a cookie with the session ID
        res.cookie('sessionId', sessionId, { httpOnly: true });
  
        res.json({ success: true, sessionId });
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  // Example protected route
  app.get(`${api_prefix}/admin/dashboard/`, (req, res) => {
    if (req.session.userId) {
      // User is authenticated, handle the request
      res.json({ message: 'Welcome to the admin dashboard!' });
    } else {
      // User is not authenticated, handle accordingly
      res.status(401).json({ error: 'Unauthorized' });
    }
  });
