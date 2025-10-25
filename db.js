const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // aapka DB username
    password: 'YOUR_PASSWORD',
    database: 'prernaDB'
});

db.connect(err => {
    if(err) throw err;
    console.log('MySQL connected...');
});

module.exports = db;
