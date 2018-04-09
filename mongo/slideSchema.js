let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let slideSchema = new Schema({
  Slideids:  [String],
  Routes: [String],
});
let slides = mongoose.model('Slides', slideSchema,'slides');
module.exports=slides