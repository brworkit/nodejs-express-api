const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('./shared/jwt');
const errorHandler = require('./shared/error_handler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// controllers
const userController = require('./features/users/user.controller');

// api routes
app.use('/users', userController);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 81;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});