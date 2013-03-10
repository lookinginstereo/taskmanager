//
// Setup MongoDB Models
// 
var Mongoose = require('Mongoose'),
    ListSchema = require('./schemas.js').ListSchema,
    TaskSchema = require('./schemas.js').TaskSchema;

var List = Mongoose.model('List', ListSchema),
    Task = Mongoose.model('Task', TaskSchema);
