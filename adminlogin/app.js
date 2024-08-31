const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');  // Ensure this path is correct

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_secret_key',  // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
}));

// Middleware to set the current path
app.use((req, res, next) => {
    res.locals.currentPath = req.path;  // Pass the current path to EJS templates
    next();
});

app.use(express.static(path.join(__dirname, 'public')));  // Correctly serve static files
app.set('view engine', 'ejs');  // Set EJS as the templating engine

// Routes
app.use('/', require('./routes/auth'));  // Authentication-related routes
app.use('/groups', require('./routes/groups'));  // CRUD operations for groups
app.use('/blockchain', require('./routes/blockchain'));  // CRUD operations for blockchain
app.use('/categories', require('./routes/category'));  // CRUD operations for categories
app.use('/marketplace', require('./routes/marketplace'));
app.use('/api/auth', require('./routes/authApi'));


// Error handling middleware (optional but recommended)
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');  // Handle 404 errors
});

app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).send('Something went wrongdd');  // Handle other errors
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
