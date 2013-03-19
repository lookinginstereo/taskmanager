var Schemas = require('./schemas.js'),
    List = Schemas.List,
    Task = Schemas.Task;

exports.getAllTaskLists = function(req, res) 
{
  res.contentType('application/json');

  // Find all the available lists
  List.find(function(errors, lists){
    if (errors) {
      res.send('there was an error getting the lists');
      res.end();
    }
    else {
      res.send(lists);
      res.end();
    }
  });

};


exports.createNewList =  function(req, res) 
{
  var newName = req.body.name,
      newList = new List({name: newName});

  newList.save(function (errors, newList) {
    if (errors) {
      res.status(500);
      res.send('Shit is broke, yo');
      res.end();
    }
    else {
      res.status(200);
      res.send('Successfully created '+newList);
      res.end();
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
        res.status(500);
      else {
        res.status(200);
        res.send(list);
        res.end();
      }
    });

  }
  else {
    res.status(204) // no change to content
  }

};


exports.deleteListById = function(req, res) 
{
  var id = req.params.id;

  List.findByIdAndRemove(id, function(err, list){
    if (err) {
      res.status(500);
      res.send(err);
      res.end();
    }
    else {
      res.status(200);
      res.end();
    }
  })

};

exports.getAllTasksForList = function(req, res)
{
  var listID = req.params.id;

  List.findById(listID, function(err, list) {
    if (err) {
      res.status(500);
      res.send('there was an error getting the list by that the id ' + listID);
      res.end();
    }
    else {
      res.send(list.children);
      res.end();
    }

  });

};


exports.createNewTaskForList = function(req, res)
{
  var listID = req.params.listID,
      taskName = req.body.name;

  List.findById(listID, function(err, list) {

    if (err) {
      res.status(500);
      res.send('there was an error getting the list by that the id ' + listID);
      res.end();
    }
    else {
      var task = new Task({name: taskName, complete: false});
      list.children.push(task);

      list.save(function(err, task) {
        if (err) {
          res.status(500);
          res.send('there was an error saving the list after adding the task');
          res.end();
        }
        else {
          res.status(200);
          res.send(task);
          res.end();
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
      res.status(500);
      res.send('there was an error getting the list by that the id ' + listID);
      res.end();
    }
    else {
      var task = list.children.id(taskID);
      task.name = taskName;
      task.complete = complete;

      list.save(function(err, task) {
        if (err) {
          res.status(500);
          res.send('there was an error saving the list after updating the task');
          res.end();
        }
        else {
          res.status(200);
          res.send(task);
          res.end();
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
      res.status(500);
      res.send('there was an error getting the list by that the id ' + listID);
      res.end();
    }
    else {
      var task = list.children.id(taskID);
      task.remove();
      
      list.save(function(err, task) {
        if (err) {
          res.status(500);
          res.send('there was an error saving the list after removing the task');
          res.end();
        }
        else {
          res.status(200);
          res.end();
        }
      });

      res.status(200);
      res.end();
    }
  });
};