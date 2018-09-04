'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json;
const app = express();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');

app.use(jsonParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/course-api', {useNewUrlParser: true})
var db = mongoose.connection;

// Message if connection to database is a fail
db.on('error', console.error.bind(console, 'connection to database failed'));
// Message if connection to database is successful
db.once('open', function(){
  console.log('Now fully connected to the \'' + db.name + '\' database');
  User.find(function (err, user) {
    if (err) return console.error(err);
  })
});


// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// GET /api/users
// route to create a new user
app.get('/api/users', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.status(200);
    res.json(users);
  });
});

// POST /api/users
// route to create a new user
app.post('/api/users', function(req, res, next){
  var user = new User(req.body);
  user.save(function(err, question){
    if(err) return next(err);
    res.status(201);
    res.redirect('/'); 
  });
});

// GET /api/courses
// Returns the Course "_id" and "title" properties
app.get('/api/courses', (req, res, next) => {
  Course.find({}, '_id title', (err, courses) => {
    if (err) return next(err);
    res.status(200);
    res.json(courses);
  });
});

// GET /api/course/:courseId 200
// Returns all Course properties and related documents for the provided course ID
app.get('/api/courses/:coursesId', (req, res, next) => {

});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
