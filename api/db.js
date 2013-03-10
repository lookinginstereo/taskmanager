// MongoDB Connection
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/test');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('- Mongoose connection has been established -');
});