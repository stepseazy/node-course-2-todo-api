const _=require('lodash');

const express=require('express');
const bodyParser=require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const {ObjectID}=require('mongodb');
var app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());

app.post(
  '/todos',
  (req,res)=>{
    var todo=new Todo({
      text:req.body.text
    });
    todo.save().then(
      (r)=>{res.send(r);},
      (e)=>{res.status(400).send(e);}
    );
  }
);

app.get('/todos',(req,res)=>{
  Todo.find().then(
    (todos)=>{
      res.send({todos});
    },
    (e)=>{
      res.status(400).send(e);
    });
});
//GET /todos/123214

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  Todo.findById(id).then(
    (r)=>{
      if(r){return res.send({r})}
      res.status(404).send();
    },
  (e)=>{res.status(400).send('error:',e)}
);
});

app.delete('/todos/:id',(req,res)=>{
  //get id
  id=req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send('invalid id');
  }
  Todo.findOneAndRemove({_id:id})
  .then((r)=>{
    if(!r){
      return res.status(404).send('not found')
    }
    res.status(200).send({r});
  },
  (e)=>{
    res.status(400).send({e});
  }
  );

});

app.patch('/todos/:id',(req,res)=>{
  var id =req.params.id;
  var body=_.pick(req.body,['text'],['completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send('invalid id');
  }

  if (_.isBoolean(body.completed)&&body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findByIdAndUpdate(id, {$set:body},{new:true})
  .then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port,
  ()=>{
    console.log(`started on port ${port}`);
  }
);

module.exports= {app};
