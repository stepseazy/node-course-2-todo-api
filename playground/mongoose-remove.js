const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
// Todo.remove({}).then((result)=>{
//
//   console.log(result);
// });

// Todo.findOneAndRemove({}).then();

//Todo.findByIdAndRemove
Todo.findOneAndRemove({_id:"5a50488934e03144676c3b3f"}).then((todo)=>{

});

Todo.findByIdAndRemove('5a50488934e03144676c3b3f').then((todo)=>{
  console.log(todo);
});
