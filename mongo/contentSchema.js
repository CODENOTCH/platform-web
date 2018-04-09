let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContentSchema = new Schema({
  Title:  String,
  Type: String,
  Paragraphs:{
    Ptext: [String],
    Pposition: [Number]
  },
  Images:{
    route: [String],
    imageposition: [Number]
  },
  Subtitles:{
    subtitle: [String],
    subposition: [Number]
  },
  Lists:{
    Ltext: [String],
    Lposition: [Number]
  },
});
let content = mongoose.model('Content', ContentSchema,'content');
module.exports=content