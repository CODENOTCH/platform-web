let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bootcampSchema = new Schema({
  name:  String,
  weeks: [String]
});
let bootcamps = mongoose.model('Bootcamps', bootcampSchema,'bootcamps');
module.exports=bootcamps