//
// Setup MongoDB Schemas
//
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  childTasks: [TaskSchema]
});

var TaskSchema = new Schema({
  name: String,
  complete: Boolean
});

var List = Mongoose.model('List', ListSchema);

module.exports = {
  List: List
};