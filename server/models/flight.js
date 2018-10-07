var mongoose=require('mongoose');

var Flight = mongoose.model('Flight',{
  name: {
    type:String,
    required: true,
    minlength: 1,
    trim: true
  },
  date:{
    type: String,
    minlength: 1,
    trim: true
  },
  lat:{
    type: Number,
    default: null
  },
  long:{
    type: Number,
    default: null
  }
});

module.exports={Flight};
