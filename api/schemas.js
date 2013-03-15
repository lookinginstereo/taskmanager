//
// Setup MongoDB Schemas
//
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  children: [TaskSchema]
});

var TaskSchema = new Schema({
  name: String,
  complete: Boolean
});

var List = Mongoose.model('List', ListSchema);

// var Task = Mongoose.model('Task', TaskSchema);

module.exports = {
  List: List
};