// app dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connection, if successful
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

// initializing app with express
const app = express();

const users = require('./routes/users');

// default port variable
const port = 3000;

// CORS middleware
app.use(cors());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// bodyParser middleware
app.use(bodyParser.json());

app.use('/users', users);

// handles listening to the specified port and starts server
app.listen(port, () => {
    console.log('Server started on port '+ port);
});