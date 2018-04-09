var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  DNI:  {type: Number, required: true },
  Adress: String,
  Phone:  {type: Number, required: true},
  Description: String,
  Links: [String],
  Photo: String,
  Birthdate: String,
  bootcampID: String,
  userID: String
});
var Teacher = mongoose.model('Teacher', teacherSchema,'teachers');
module.exports=Teacher