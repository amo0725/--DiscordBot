const mysql = require('mysql2');
//const Config = require('../config');
const pool = mysql.createPool(process.env.DATABASE_URL);




module.exports = pool.promise();