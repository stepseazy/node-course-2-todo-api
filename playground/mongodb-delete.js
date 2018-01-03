// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

  if (err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');
  const myDB=db.db('TodoApp');
  //deleteMany
  // myDB.collection('Todos').deleteMany({text:'Eat lunch'})
  // .then((result)=>{
  //   console.log(result);
  // });
  //deleteOne
  // myDB.collection('Todos').deleteOne({text:'Eat lunch'})
  // .then((result)=>{
  //   console.log(result);
  // });

  //findoneandDelete
  // myDB.collection('Todos').findOneAndDelete({completed:false})
  // .then((result)=>{
  //   console.log(result);
  // });

  //find duplicate names and use duplicate many to deleteMany
  // myDB.collection('Users').deleteMany({
  //     name:"Rik"
  //   }).then((result)=>{
  //     console.log(result);
  //   });
  //find and delete one by using deleteone
  // myDB.collection('Users').findOneAndDelete({
  //   _id:new ObjectID('5a4d3979ed3c7ec283adf3f3')
  // }).then((result)=>{
  //   console.log(JSON.stringify(result,undefined,2));
  // });
  // db.close();


});
