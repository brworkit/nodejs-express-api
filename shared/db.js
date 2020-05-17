const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../features/user/user.model')
};


/* POSTGRES DB CONNECTION EXAMPLE */
// const { Client } = require('pg')

// const client = new Client({
//   user: 'user',
//   host: 'database.url:PORT',
//   database: 'mydatabase', 
//   password: 'password',
//   port: 5432,
// })
// client.connect()

// client.query("SET search_path TO 'SCHEMA';");

// client.query('SELECT NOW()', (err, res) => {
//    console.log(err, res)
//    client.end()
// })

