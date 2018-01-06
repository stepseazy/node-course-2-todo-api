var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
module.exports={mongoose};
