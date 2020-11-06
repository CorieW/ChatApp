const mysql = require('mysql2')

const connection = process.env.NODE_ENV === "production" ? mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.PASSWORD
}) :
    mysql.createConnection({
        host: 'localhost',
        database: 'urlwords',
        user: 'root',
        port: 3306
    })

connection.connect()

module.exports = connection