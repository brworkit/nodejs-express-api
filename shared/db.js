
/* MONGO DB CONNECTION EXAMPLE
const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../features/user/user.model')
};*/

/* POSTGRES DB CONNECTION EXAMPLE */
const { Client } = require('pg')

const client = new Client({
  user: 'cdt_user',
  host: 'microservicedb.hml.caradhras.io',
  database: 'microservices', 
  password: 'cdt!#$1234',
  port: 5432,
})
client.connect()

client.query("SET search_path TO 'WEBHOOK';");

client.query('SELECT NOW()', (err, res) => {
   console.log(err, res)
   client.end()
})

