mongoose=require('mongoose');

var User= mongoose.model('User',{
  email:{
    type:String,
    minlenth:1,
    trim:true,
    required:true
  },
});

module.exports={User};
