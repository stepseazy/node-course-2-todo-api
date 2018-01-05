const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
// const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');


// var id='5a4fb6f144959d42b80f70bd';
// if(!ObjectID.isValid(id)){
//   console.log('ID not vallid');
// };
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todos',todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('id not found');
//   }
//   console.log('Todo by ID',todo);
// }).catch((e)=>console.log(e));

//querey users collection by findbyID
//3cases query nousers, user found pring users, handle err by print

User.findById("5a4e63c6d760a31e3418f67a").then((r)=>{
  if(!r){
    return console.log('user not found');
  }
  console.log('print user by id',JSON.stringify(r,undefined,2));
},(e)=>{
  console.log(e);
});
