//
// Setup MongoDB Schemas
//
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  children: []
});

var List = Mongoose.model('List', ListSchema);

var TaskSchema = new Schema({
  name: String,
  complete: Boolean
});

var Task = Mongoose.model('Task', TaskSchema);

module.exports = {
  List: List,
  Task: Task 
};