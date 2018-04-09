let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username:  {type: String, required: true, unique: true },
  mail: {type:String, required:true, unique: true},
  password:  {type: String, required: true},
  type: String
});
let User = mongoose.model('User', userSchema,'users');
module.exports=User