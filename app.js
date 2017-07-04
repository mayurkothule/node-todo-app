var express=require('express');
var todoController=require('./controllers/todo_controller');

var app=express();

//set up template engine
app.set('view engine','ejs');

//static files(this middleware match the path)
//app.use(express.static('./public'));
app.use('/assets',express.static('./public'));

//fire controllers
todoController(app);

//listen port
app.listen(3000);
console.log('You are listening to port number 3000');
