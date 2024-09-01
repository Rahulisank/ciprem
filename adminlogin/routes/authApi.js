const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Ensure this path is correct
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const multer = require('multer');

// Setup email transport using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',  // or another email service provider
    auth: {
        user: 'rs707406@gmail.com', // Replace with your email
        pass: 'mfoguxfbmnlvgteb'   // Replace with your email password
    }
});



// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Append the file extension
    }
});

const upload = multer({ storage: storage });

// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists 
router.post('/checkemail', (req, res) => {
    const { email } = req.body; 

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const query = 'SELECT COUNT(*) AS count FROM login WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        const emailExists = results[0].count > 0;
        res.json({ success: true, exists: emailExists, message: emailExists ? 'Email exists' : 'Email does not exist' });
    });
});

// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if email exists
    const checkEmailQuery = 'SELECT COUNT(*) AS count FROM login WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        if (results[0].count > 0) return res.status(400).json({ success: false, message: 'Email already in use' });

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ success: false, message: 'Error hashing password' });

            // Insert new user
            const insertQuery = 'INSERT INTO login (name, email, password, email_verified, created_at) VALUES (?, ?, ?, ?, ?)';
            const emailVerified = false;  // Email not verified initially
            const createdAt = new Date();

            db.query(insertQuery, [name, email, hashedPassword, emailVerified, createdAt], (err, results) => {
                if (err) return res.status(500).json({ success: false, message: 'Database error' });

                // Send verification email
                const token = crypto.randomBytes(20).toString('hex');
                const verificationUrl = `http://localhost:4000/api/verify-email/${token}`;

                const mailOptions = {
                    from: 'your-email@gmail.com',
                    to: email,
                    subject: 'Account Verification',
                    text: `Please verify your account by clicking the link: ${verificationUrl}`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) return res.status(500).json({ success: false, message: 'Error sending email' });

                    res.json({ success: true, message: 'Signup successful, please check your email to verify your account' });
                });

                // Store token in the database (implement this part as needed)
            });
        });
    });
});

// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
router.get('/verify-email/:token', (req, res) => {
    const token = req.params.token;

    // Validate token and update user email verification status
    // Implement token validation and update query here

    res.json({ success: true, message: 'Email verification successful!' });
});

// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const query = 'SELECT id, password FROM login WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        if (results.length === 0) return res.status(400).json({ success: false, message: 'Invalid email or password' });

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ success: false, message: 'Error comparing passwords' });
            if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

            // Successful login, return user id
            res.json({ success: true, message: 'Login successful', userId: user.id });
        });
    });
});








// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API

router.post('/addgroup', upload.single('groupimage'), (req, res) => {
    const { groupname, description } = req.body;

    // Check if required fields are provided
    if (!groupname || !description || !req.file) {
        return res.status(400).json({ success: false, message: 'All fields (groupname, description, groupimage) are required' });
    }

    // File path for the uploaded image
    const groupImagePath = `/uploads/${req.file.filename}`;

    // Insert group details into the database
    const insertQuery = 'INSERT INTO groups (groupname, groupimage, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
    const createdAt = new Date();
    const updatedAt = createdAt;

    db.query(insertQuery, [groupname, groupImagePath, description, createdAt, updatedAt], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Group inserted successfully', groupId: result.insertId });
    });
});


module.exports = router;
