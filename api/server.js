var Express = require('express'),
    Database = require('./db.js'),
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


//
// LIST CALLS
//

app.get('/list/all', API.getAllTaskLists); // get all currently available task lists
app.post('/list/create/:name', API.createNewList); // create a new task list
app.post('/list/update/:id', API.updateListNameById); // Update a specific list
app.post('/list/delete/:id', API.deleteListById); // delete a specific list

//
// TASK CALLS
//

app.get('/list/:id/tasks', API.getAllTasksForList); // get all currently available tasks for a list
// app.post('/list/create/:listID/tasks/:name', API.createNewTaskForList); // create new task for a specific list
// app.post('/list/update/:listID/tasks/:taskID/:name', API.updateTaskNameById); // update task name by id for a specific list
// app.post('/list/delete/:listID/tasks/:taskID', API.deleteTaskById); // remove a task from a specific list


app.listen(3000, "task.local");
console.log('--- Started node server --');