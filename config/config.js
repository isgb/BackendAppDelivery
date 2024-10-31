const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'isaias.zentro1',
    password: '123456',
    database: 'udemy_delivery',
    port: 3307
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABSE CONNECTED!');
});

module.exports = db;