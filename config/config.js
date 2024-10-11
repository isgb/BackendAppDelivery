const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'isaias.zentro1',
    database: 'udemy_delivery'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABSE CONNECTED!');
});

module.exports = db;