var Schemas = require('./schemas.js'),
    List = Schemas.List,
    Task = Schemas.Task;

exports.getAllTaskLists = function(req, res) 
{
  res.contentType('application/json');

  // Find all the available lists
  List.find(function(errors, lists){
    if (errors) {
      res.send(500, errors);
    }
    else {
      res.send(200, lists);
    }
  });

};


exports.createNewList =  function(req, res) 
{
  var newName = req.body.name,
      newList = new List({name: newName});

  newList.save(function (err, newList) {
    if (err) {
      res.send(500, err);
    }
    else {
      res.send(200, 'Successfully created '+newList);
    }
    
  });
};


exports.updateListNameById = function(req, res) 
{
  var id = req.params.id;
      newName = req.body.name || null;

  if (newName !== null) {

    List.findByIdAndUpdate(id, { $set: {name: newName} }, function (err, list) {
      if (err)
        res.send(500, err);
      else {
        res.send(200, list);
      }
    });

  }
  else {
    res.send(204) // no change to content
  }

};


exports.deleteListById = function(req, res) 
{
  var id = req.params.id;

  List.findByIdAndRemove(id, function(err, list){
    if (err) {
      res.send(500, err);      
    }
    else {
      res.send(200); 
    }
  });

};

exports.getAllTasksForList = function(req, res)
{
  var listID = req.params.id;

  List.findById(listID, function(err, list) {
    if (err) {
      res.send(500, 'There was an error getting the list by that the id ' + listID);
    }
    else {
      res.send(200, list.children);
    }
  });

};


exports.createNewTaskForList = function(req, res)
{
  var listID = req.params.listID,
      taskName = req.body.name;

  List.findById(listID, function(err, list) {

    if (err) {
      res.send(500, 'there was an error getting the list by that the id ' + listID);      
    }
    else {
      var task = new Task({name: taskName, complete: false});
      list.children.push(task);

      list.save(function(err, task) {
        if (err) {
          res.send(500, 'there was an error saving the list after adding the task');          
        }
        else {
          res.send(200, task);
          
        }
      });
    }

  });

};

exports.updateTaskById = function(req, res) 
{
  console.log(req.body);
  var listID = req.params.listID,
      taskID = req.params.taskID,
      taskName = req.body.name,
      complete = req.body.complete;

  List.findById(listID, function(err, list) {
    if (err) {
      res.send(500, 'there was an error getting the list by that the id ' + listID);      
    }
    else {
      var task = list.children.id(taskID);
      task.name = taskName;
      task.complete = complete;

      list.save(function(err, task) {
        if (err) {
          res.send(500, 'there was an error saving the list after updating the task');
          
        }
        else {
          res.send(200, task);          
        }
      });
    }
  });

};

exports.deleteTaskById = function(req, res) 
{
  var listID = req.params.listID,
      taskID = req.params.taskID;

  List.findById(listID, function(err, list) {
    if (err) {
      res.send(500, 'there was an error getting the list by that the id ' + listID);      
    }
    else {
      var task = list.children.id(taskID);
      task.remove();
      
      list.save(function(err, task) {
        if (err) {
          res.send(500, 'there was an error saving the list after removing the task');          
        }
        else {
          res.send(200);
        }
      });      
    }
  });

};