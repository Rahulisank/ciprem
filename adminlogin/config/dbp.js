const mysql = require('mysql2/promise');

// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin_app'
});

module.exports = pool;
