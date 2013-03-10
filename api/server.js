var Express = require('express'),
    Schemas = require('./schemas.js'),
    List = Schemas.List,
    Task = Schemas.Task,
    Database = require('./db.js'),
    app = Express();

// get all currently available task lists
app.get('/lists', function(req, res)
{

  // set the content type for the browser
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

});

// create a new task list
app.post('/lists/:name', function(req, res) 
{
  var newName = req.params.name,
      newList = new List({name: newName});

  newList.save(function (errors, newList) {
    if (errors) {
      console.log(errors);
      res.statusCode = 500;
      res.send('Shit is broke, yo');
      res.end();
    }
    else {
      res.statusCode = 200;
      res.send('Successfully created '+newList);
      res.end();
    }
    
  });
});

// delete a specific task list
app.delete('/lists/:id', function(req, res) 
{

});

app.listen(3000, "task.local");
console.log('--- Started node server --');