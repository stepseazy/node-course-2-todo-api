// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

  if (err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');
  const myDB=db.db('TodoApp');
  //
  // myDB.collection('Todos')
  // .findOneAndUpdate(
  //   {_id:new ObjectID('5a4d339ced3c7ec283adefdb')},
  //   {$set:{
  //     completed:true
  //
  //   }},
  //   {returnOriginal:false}
  //
  // ).then((result)=>{
  //   console.log(result);
  // });

  //change name
  // myDB.collection('Users')
  // .findOneAndUpdate(
  //   {_id: new ObjectID("5a4d17a0d570db31f0629143")},
  //   {$set:{name:"Rik"}},
  //   {returnOriginal:false})
  //   .then(
  //     (result)=>{console.log(result);
  //     }
  //   );

  //increment age
  myDB.collection('Users')
  .findOneAndUpdate(
    {_id: new ObjectID("5a4d17a0d570db31f0629143")},
    {$inc:{age:10}},
    {returnOriginal:false})
    .then(
      (result)=>{console.log(result);
      }
    );
  // db.close();


});
