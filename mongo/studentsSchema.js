var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  DNI:  {type: Number, required: true },
  Adress: String,
  Phone:  {type: Number, required: true},
  Description: String,
  Github: String,
  Linkedin: String,
  Twitter: String,
  Photo: String,
  Brithdate: String,
  PostalCode: String,
  BornPlace:String,
  Sex: String,
  Nationality: String,
  CourseType: String,
  Studies: String,
  WorkExp: String,
  Meetus: String,
  InterestedOn: String,
  Comment:[String],
  MainObjectives: String,
  AdminNotes: [String],
  ContNotes: [String],
  CivilStatus: String,
  Hobbies: [String],
  ThemesOfInterest: [String],
  VisitedCompanies : [String],
  JobProfile:String,
  PayMethod: String,
  FactData: {
    Name: String,
    CIF: String,
    Adress: String
  },
  bootcampID: String,
  userID: String
});
var Student = mongoose.model('Student', StudentSchema,'students');
module.exports=Student