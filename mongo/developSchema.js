let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DevelopSchema = new Schema({
  Titles:  [String],
  Contentids: [String],
  Paragraphs:{
    Ptext: [String],
    Pposition: [Number]
  },
  Images:{
    route: [String],
    imageposition: [Number]
  }
});
let develop = mongoose.model('Developments', DevelopSchema,'developments');
module.exports=develop