require('dotenv').config();
const express = require("express");

const http = require('http');
const { socketConnection } = require('./chat'); // Import the chat module
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');  // Add Passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require("path");
const db = require("./config/db"); // Ensure this path is correct
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    socketConnection(socket); // Handle socket events
});
// Use environment variables for URL and PORT
const PORT = process.env.PORT || 4000;
const URL = process.env.URL;
  

// Set up middleware
// Allow all origins (or specify certain origins)

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "bgbsdfgbsdbadfba", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);








// Use environment variables for Google client ID and secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Initialize Passport and configure the Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}:${process.env.PORT}/api/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    // Database query logic here...
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
}); 


// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the current path
app.use((req, res, next) => {
  res.locals.currentPath = req.path; // Pass the current path to EJS templates
  next();
});

app.use(express.static(path.join(__dirname, "public"))); // Correctly serve static files
app.set("view engine", "ejs"); // Set EJS as the templating engine

// Routes
app.use("/", require("./routes/auth")); // Authentication-related routes
app.use("/groups", require("./routes/groups")); // CRUD operations for groups
app.use("/blockchain", require("./routes/blockchain")); // CRUD operations for blockchain
app.use("/categories", require("./routes/category")); // CRUD operations for categories
app.use("/marketplace", require("./routes/marketplace"));
app.use("/api", require("./routes/authApi"));



// Route to serve the chat page
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Error handling middleware (optional but recommended)
app.use((req, res, next) => {
  res.status(404).send("Page Not Found"); // Handle 404 errors
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).send("Something went wrongdd"); // Handle other errors
});



// Start the server
app.listen(4000, () => {
  console.log(`Server running at ${URL}:${PORT}`);
});
