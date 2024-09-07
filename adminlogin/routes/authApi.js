const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure this path is correct
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const multer = require("multer"); 
const path = require('path');
// Setup email transport using Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service provider
  auth: {
    user: "rs707406@gmail.com", // Replace with your email
    pass: "mfoguxfbmnlvgteb", // Replace with your email password
  },
});


// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage: storage });

// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
// Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists // Check if email exists
router.post("/checkemail", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const query = "SELECT COUNT(*) AS count FROM login WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Database error" , email:email});
    const emailExists = results[0].count > 0;
    res.json({
      success: true,
      exists: emailExists,
      email: email,
      message: emailExists ? "Email exists" : "Email does not exist",
    });
  });
});

// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up// Sign up
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Check if email exists
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM login WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    if (results[0].count > 0)
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error hashing password" });

      // Insert new user
      const insertQuery =
        "INSERT INTO login (name, email, password, email_verified, created_at) VALUES (?, ?, ?, ?, ?)";
      const emailVerified = false; // Email not verified initially
      const createdAt = new Date();

      db.query(
        insertQuery,
        [name, email, hashedPassword, emailVerified, createdAt],
        (err, results) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "Database error" });

          // Send verification email
          const token = crypto.randomBytes(20).toString("hex");
          const verificationUrl = `http://192.241.147.143:4000/api/verify-email/${token}`;

          const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Account Verification",
            text: `Please verify your account by clicking the link: ${verificationUrl}`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err)
              return res
                .status(500)
                .json({ success: false, message: "Error sending email" });

            res.json({
              success: true,
              message:
                "Signup successful, please check your email to verify your account",
            });
          });

          // Store token in the database (implement this part as needed)
        }
      );
    });
  });
});

// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email// Verify email
router.get("/verify-email/:token", (req, res) => {
  const token = req.params.token;

  // Validate token and update user email verification status
  // Implement token validation and update query here

  res.json({ success: true, message: "Email verification successful!" });
});

// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const query = "SELECT id, email,password FROM login WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    if (results.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error comparing passwords" });
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });

      // Successful login, return user id
      res.json({ success: true, message: "Login successful", userId: user.id, email: user.email });
    });
  });
});

// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
router.post("/addgroup", upload.single("groupimage"), (req, res) => {
  const { groupname, description,matured, userid } = req.body; // Assuming userid is sent in req.body

  // Check if required fields are provided
  if (!groupname || !description || !matured || !req.file || !userid) {
    return res.status(400).json({
      success: false,
      message: "All fields (groupname, description, groupimage,matured, userid) are required",
    });
  }

  // File path for the uploaded image
  const groupImagePath = `${req.file.filename}`;

  // Insert group details into the database
  const insertQuery =
    "INSERT INTO `groups` (groupname, groupimage, description, matured, userid, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const createdAt = new Date();
  const updatedAt = createdAt;

  db.query(
    insertQuery,
    [groupname, groupImagePath, description,matured, userid, createdAt, updatedAt],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      res.json({
        success: true,
        message: "Group inserted successfully",
        groupId: result.insertId,
      });
    }
  );
});




router.post("/editgroup", upload.single("groupimage"), (req, res) => {
  const { groupId, groupname,matured,description, userid } = req.body;
  const newImage = req.file ? req.file.filename : null; // Check if a new image was uploaded

  // Check if required fields are provided
  if (!groupId || !groupname || !description || !matured || !userid) {
    return res.status(400).json({
      success: false,
      message: "All fields (groupId, groupname,matured, description, userid) are required",
    });
  }

  // Construct SQL query based on whether a new image is provided
  let updateQuery = `UPDATE \`groups\` SET groupname = ?, description = ?, matured = ?, userid = ?, updated_at = ?`;
  let queryParams = [groupname, description,matured, userid, new Date()];

  // If a new image is provided, update the image field
  if (newImage) {
    updateQuery += `, groupimage = ?`;
    queryParams.push(newImage);
  }

  updateQuery += ` WHERE id = ?`;
  queryParams.push(groupId);

  db.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({
      success: true,
      message: "Group updated successfully",
    });
  });
});





router.delete("/deletegroup/:id", (req, res) => {
  const groupId = req.params.id;

  // Validate groupId
  if (!groupId) {
    return res.status(400).json({
      success: false,
      message: "groupId is required",
    });
  }

  // Delete group from database
  const deleteQuery = "DELETE FROM `groups` WHERE id = ?";

  db.query(deleteQuery, [groupId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.json({
      success: true,
      message: "Group deleted successfully",
    });
  });
});









router.post("/singlegroup", (req, res) => {
  // Get base URL from environment variables
  const baseUrl = `${process.env.URL}:${process.env.PORT}/uploads/`;

  // Extract the group ID from the request body
  const { id } = req.body;

  // Validate the ID
  if (!id) {
    return res.status(400).json({ success: false, message: "Group ID is required" });
  }

  // Query to retrieve a single group by its ID
  const selectQuery = "SELECT * FROM `groups` WHERE id = ?";

  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // Check if the group was found
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    // Assuming results[0] is the group object
    const group = results[0];

    // Update the groupimage field with the full URL
  
    group.groupimage = group.groupimage ? `${baseUrl}${group.groupimage}` : '';
    res.json({
      success: true,
      group: group,
    });
  });
});




router.post("/allgroups", (req, res) => {
  // Get base URL from environment variables
  const baseUrl = `${process.env.URL}:${process.env.PORT}/uploads/`;

  // Query to retrieve all groups from the database
  const selectQuery = "SELECT * FROM `groups`";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // Map over results to update the groupimage field with the full URL
    const updatedResults = results.map(group => ({
      ...group,
      groupimage: group.groupimage ? `${baseUrl}${group.groupimage}` : ''
    }));

    res.json({
      success: true,
      groups: updatedResults,
    });
  });
});








// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API
// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API// Insert Group API









router.post("/joinedgroups", (req, res) => {
  const { userid } = req.body;

  // Validate if userid is provided
  if (!userid) {
    return res.status(400).json({
      success: false,
      message: "userid is required",
    });
  }

  // Query to retrieve all groups joined by a specific user
  const selectQuery = `
    SELECT j.id, j.userid, j.groupid, j.joinedon, g.groupname,g.matured, g.description 
    FROM joined_groups j
    INNER JOIN groups g ON j.groupid = g.id
    WHERE j.userid = ?
  `;

  db.query(selectQuery, [userid], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({
      success: true,
      joinedGroups: results,
    });
  });
});






router.post("/joingroup", (req, res) => {
  const { userid, groupid } = req.body;
  console.table(req.body);
  // Validate input
  if (!userid || !groupid) {
    return res.status(400).json({
      success: false,
      message: "userid and groupid are required",
    });
  }

  // Current time for joinedon
  const joinedOn = new Date();

  // Insert record into joined_groups table
  const insertQuery = "INSERT INTO `joined_groups` (`userid`, `groupid`, `joinedon`) VALUES (?, ?, ?)";

  db.query(insertQuery, [userid, groupid, joinedOn], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({
      success: true,
      message: "User joined group successfully",
      joinId: result.insertId,
    });
  });
});

router.post("/leavegroup", (req, res) => {
  const { userid, groupid } = req.body;

  // Validate input
  if (!userid || !groupid) {
    return res.status(400).json({
      success: false,
      message: "userid and groupid are required",
    });
  }

  // Delete record from joined_groups table
  const deleteQuery = "DELETE FROM `joined_groups` WHERE `userid` = ? AND `groupid` = ?";

  db.query(deleteQuery, [userid, groupid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.json({
      success: true,
      message: "User left group successfully",
    });
  });
});




// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API
// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API
// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API
// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API
// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API
// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API// Insert POSTSS API


 






router.post("/singlepost", (req, res) => {
  // Get base URL from environment variables
  const baseUrl = `${process.env.URL}:${process.env.PORT}/uploads/`;

  // Extract the post ID from the request body
  const { id } = req.body;

  // Validate the ID
  if (!id) {
    return res.status(400).json({ success: false, message: "Post ID is required" });
  }

  // Query to retrieve a single post by its ID
  const selectQuery = "SELECT * FROM `posts` WHERE id = ?";

  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // Check if the post was found
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Assuming results[0] is the post object
    const post = results[0];

    // Update the image field with the full URL 
    post.image = post.image ? `${baseUrl}${post.image}` : '';

    res.json({
      success: true,
      post: post,
    });
  });
});


router.post("/allpost", (req, res) => {
  // Get base URL from environment variables
  const baseUrl = `${process.env.URL}:${process.env.PORT}/uploads/`;

  // Query to retrieve all groups from the database
  const selectQuery = "SELECT * FROM `posts`";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

  // Map over results to update the image field with the full URL
  const updatedResults = results.map(post => ({
    ...post,
    image: post.image ? `${baseUrl}${post.image}` : '' // Ensure `post.image` is correctly handled
  }));
  
    res.json({
      success: true,
      posts: updatedResults,
    });
  });
});



router.post("/addpost", upload.single("image"), (req, res) => {
  const { groupid, userid, title, description, tags, matured } = req.body;

  // Validate input
  if (!groupid || !userid || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "groupid, userid, title, description, and matured fields are required",
    });
  }

  // Image handling
  const image = req.file ? req.file.filename : null;

  // Format tags as a comma-separated string
  const tagsString = tags ? tags.split(',').map(tag => tag.trim()).join(',') : null;

  // Insert query
  const insertQuery = `
    INSERT INTO posts (groupid, userid, title, description, image, tags, matured, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const createdAt = new Date();
  const updatedAt = createdAt;

  db.query(
    insertQuery,
    [groupid, userid, title, description, image, tagsString, matured, createdAt, updatedAt],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({
        success: true,
        message: "Post added successfully",
        postId: result.insertId,
      });
    }
  );
});




router.post("/updatepost", upload.single("image"), (req, res) => {
  const { id, groupid, userid, title, description, tags, matured } = req.body;

  // Validate input
  if (!id || !groupid || !userid || !title || !description || matured === undefined) {
    return res.status(400).json({
      success: false,
      message: "id, groupid, userid, title, description, and matured fields are required",
    });
  }

  // Image handling
  const image = req.file ? req.file.filename : null;

  // Format tags as a comma-separated string
  const tagsString = tags ? tags.split(',').map(tag => tag.trim()).join(',') : null;

  // Update query
  const updateQuery = `
    UPDATE posts 
    SET groupid = ?, userid = ?, title = ?, description = ?, image = IFNULL(?, image), tags = ?, matured = ?, updated_at = ?
    WHERE id = ?
  `;

  const updatedAt = new Date();

  db.query(
    updateQuery,
    [groupid, userid, title, description, image, tagsString, matured, updatedAt, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      res.json({
        success: true,
        message: "Post updated successfully",
      });
    }
  );
});







router.post("/deletepost", (req, res) => {
  const { id, userid } = req.body;

  // Validate input
  if (!id || !userid) {
    return res.status(400).json({
      success: false,
      message: "id and userid are required",
    });
  }

  // Delete query
  const deleteQuery = "DELETE FROM posts WHERE id = ? AND userid = ?";

  db.query(deleteQuery, [id, userid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Post not found or you do not have permission to delete this post" });
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  });
});




module.exports = router;
