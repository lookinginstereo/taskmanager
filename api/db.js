// MongoDB Connection
var Mongoose = require('mongoose');

Mongoose.connect('task.local','apitest');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('- Mongoose connection has been established -');
});