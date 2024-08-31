const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../config/dbp');
const router = express.Router();




const SECRET_KEY = 'salttogetinmal'; // Replace with a secure secret key

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email provider
    auth: {
        user: 'rs707406@gmail.com', // Replace with your email
        pass: 'mfoguxfbmnlvgteb'   // Replace with your email password
    }
});
// Email Signup API
router.post('/signup/email', async (req, res) => {
    const { email } = req.body;
    
    try {
        // Check if email already exists
        const [rows] = await db.query('SELECT * FROM login WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Generate a verification token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        // Insert email into the database (without verification)
        await db.query('INSERT INTO login (email, email_verified) VALUES (?, ?)', [email, false]);

        // Construct verification URL
        const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${token}`;

        // Send verification email
        await transporter.sendMail({
            from: '"Your App Name" <your-email@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Email Verification', // Subject line
            text: `Please verify your email by clicking the following link: ${verificationUrl}`, // plain text body
            html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>` // html body
        });

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error('Error during email signup:', error.message);
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});


// Email Verification API
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;

        // Update the email_verified field in the database
        await db.query('UPDATE login SET email_verified = ? WHERE email = ?', [true, email]);

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
});



// Username Signup API
router.post('/signup/username', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if username is unique
    const existingUser = await db.query('SELECT * FROM login WHERE username = ?', [username]);
    if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Username already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    await db.query('INSERT INTO login (username, email, password) VALUES (?, ?, ?)', [username, null, hashedPassword]);
    res.status(201).json({ message: 'User created successfully' });
});

// Login API
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by email or username
    const user = await db.query('SELECT * FROM login WHERE email = ? OR username = ?', [username, username]);
    if (user.length === 0) {
        return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    // Return success response or token (if needed)
    res.status(200).json({ message: 'Login successful' });
});

// Verify Email API (Placeholder for email verification logic)
router.get('/verify-email', async (req, res) => {
    const { email, token } = req.query;

    // Verify the token and update email_verified in the database
    // ...

    res.status(200).json({ message: 'Email verified successfully' });
});

// Google Sign-Up API (using Clerk)
router.post('/signup/google', (req, res) => {
    // Implement Google OAuth logic here
    // ...

    res.status(200).json({ message: 'Google signup successful' });
});

// Wallet Sign-Up API (using Clerk + MetaMask)
router.post('/signup/wallet', (req, res) => {
    // Implement MetaMask wallet sign-up logic here
    // ...

    res.status(200).json({ message: 'Wallet signup successful' });
});

module.exports = router;
