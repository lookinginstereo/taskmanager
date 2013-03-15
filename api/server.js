var Express = require('express'),
    Database = require('./db.js'),
    Mongoose = require('mongoose'),
    API = require('./routeMethods.js'),
    app = Express();


app.configure(function(){

  // allow cross domain access
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  
  // enable req.body parsing
  app.use(Express.bodyParser());
   
});

app.get('/lists/all', API.getAllTaskLists); // get all currently available task lists
app.post('/lists/create/:name', API.createNewList); // create a new task list
app.post('/lists/update/:id', API.updateListNameById); // Update list
app.delete('/lists/delete/:id', API.deleteListById); // delete a specific lsit


app.listen(3000, "task.local");
console.log('--- Started node server --');