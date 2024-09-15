require('dotenv').config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db"); // Ensure this path is correct

const app = express();


// Use environment variables for URL and PORT
const PORT = process.env.PORT || 4000;
const URL = process.env.URL;
  

// Set up middleware
// Allow all origins (or specify certain origins)
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to handle raw JSON data

app.use(
  session({
    secret: "bgbsdfgbsdbadfba", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

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
