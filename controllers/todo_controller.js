var bodyParser=require('body-parser');

var mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds131782.mlab.com:31782/todos');

//create a schema, this is like a blueprint

var todoSchema=new mongoose.Schema({
  item:String
})

var Todo=mongoose.model('Todo',todoSchema);

// var itemOne=Todo({item:'buy flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved')
// })

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//var data=[{item:'Reading'},{item:'Ridding'},{item:'Play  Chess'}];


module.exports=function(app){

app.get('/todo',function(req,res){

  //get data from mongodb and pass it to view
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos:data});
  })

});

app.post('/todo',urlencodedParser,function(req,res){
    var newTodo=Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
});

app.delete('/todo/:item',function(req,res){

  console.log('1111',req.params.item)

  Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data) {
    if(err) throw err;
    res.json(data);
  });
  
});

};
