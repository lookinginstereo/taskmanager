var Schemas = require('./schemas.js'),
    List = Schemas.List;

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
  var newName = req.params.name,
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
        return handleError(err);
      else
        res.status(200);
        res.send(list);
        res.end();
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
      res.send(list.childTasks);
      res.end();
    }

  });

};


exports.createNewTaskForList = function(req, res)
{
  var listID = req.params.id;

  List.findById(listID, function(err, list) {
    if (err) {
      res.status(500);
      res.send('there was an error getting the list by that the id ' + listID);
      res.end();
    }
    else {
      list.childTasks.push
      res.end();
    }

  });

};