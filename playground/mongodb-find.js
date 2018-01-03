// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

  if (err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

  const myDB=db.db('TodoApp');


  // myDB.collection('Todos').find({
  //   _id:new ObjectID('5a4d20cfed3c7ec283ade89c')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err)=>{
  //   console.log('unable to fetch todos',err);
  // });

  // myDB.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count:${count}`);
  //
  // }, (err)=>{
  //   console.log('unable to fetch todos',err);
  // });

  myDB.collection('Users').find({name:"Rik"}).toArray()
  .then((docs)=>{
      console.log('users named Rik:');
      console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("error:",err);
  });

  // db.close();
});
