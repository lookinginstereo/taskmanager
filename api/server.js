var Express = require('express'),
    Schemas = require('./schemas.js'),
    List = Schemas.List,
    Database = require('./db.js'),
    Mongoose = require('mongoose'),
    app = Express();


app.configure(function(){

  // allow cross domain access
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
   
});



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
});

// delete a specific task list
app.get('/lists/:id', function(req, res) 
{
  var id = req.params.id;

      List.find({_id: id}, function(err, list) {
        if (err) {
          res.status(404);
          res.send(err);
        }
        else {
          res.send(list);
        }
        
      });
});

app.listen(3000, "task.local");
console.log('--- Started node server --');