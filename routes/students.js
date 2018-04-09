let express = require('express');
let router = express.Router();
let student = require('../mongo/studentsSchema.js');
let mongoose = require('mongoose');
let session=require('express-sesssion')

let conn=mongoose.connection;

router.post('/insertStudent',(req,res,next)=>{
    let studentData={
        DNI:req.body.DNI,
        Adress:req.body.adress,
        Phone:req.body.phone,
        Description:req.body.description,
        Linkedin:req.body.linkedin,
        Github: req.body.github,
        Twitter: req.body.twitter,
        Photo:req.body.photo,
        Birthdate: req.body.birthdate,
        BornPlace:req.body.bornplace,
        Sex:req.body.sex,
        PostalCode:req.body.postalcode,
        Nationality: req.body.nationality,
        CourseType: req.body.coursetype,
        Studies: req.body.studies,
        WorkExp: req.body.workexp,
        Meetus: req.body.meetus,
        InterestedOn: req.body.interestedon,
        MainObjectives: req.body.mainobjectives,
        AdminNotes: req.body.adminotes,
        ContNotes: req.body.accountnotes,
        CivilStatus: req.body.civilstatus,
        Hobbies: req.body.hobbies,
        ThemesOfInterest: req.body.themesofinterest,
        VisitedCompanies: req.body.visitedcompanies,
        JobProfile: req.body.jobprofile,
        PayMethod: req.body.paymethod,
        FactData:{
            Name:req.body.factname,
            CIF: req.body.cif,
            Adress:req.body.factadress
        },
        bootcampID: req.body.bootcampid,
        userID:req.session.userid
      }
      let newStudent=new student(studentData)
      newStudent.save((err,studentData)=>{
        if(err) res.send({code: 500, message: err.message })
        else
        res.send(studentData)
      }) 
})

router.delete('/deleteStudent',(req,res,next)=>{
    student.remove({userID:req.body.userid},(err,data)=>{
        if (err) res.send({message:err.message,code:500})
        else
        res.send(data)
    })
})
router.get('/getAllStudents',(req,res,next)=>{
    student.find({},(err,data)=>{
        res.send(data)
    })
})
router.put('/updateStudent',(req,res,next)=>{
    let newStudent={
        DNI:req.body.DNI,
        Adress:req.body.adress,
        Phone:req.body.phone,
        Description:req.body.description,
        Linkedin:req.body.linkedin,
        Github: req.body.github,
        Twitter: req.body.twitter,
        Photo:req.body.photo,
        Birthdate: req.body.birthdate,
        BornPlace:req.body.bornplace,
        Sex:req.body.sex,
        Nationality: req.body.nationality,
        CourseType: req.body.coursetype,
        Studies: req.body.studies,
        WorkExp: req.body.workexp,
        PostalCode:req.body.postalcode,
        Meetus: req.body.meetus,
        InterestedOn: req.body.interestedon,
        MainObjectives: req.body.mainobjectives,
        AdminNotes: req.body.adminotes,
        ContNotes: req.body.accountnotes,
        CivilStatus: req.body.civilstatus,
        Hobbies: req.body.hobbies,
        ThemesOfInterest: req.body.themesofinterest,
        VisitedCompanies: req.body.visitedcompanies,
        JobProfile: req.body.jobprofile,
        PayMethod: req.body.paymethod,
        FactData:{
            Name:req.body.factnombre,
            CIF: req.body.cif,
            Adress:req.body.factadress
        },
        bootcampID: req.body.bootcampid,
        userID:req.session.userid
      }
    student.findOneAndUpdate({userID:newStudent.userID},newStudent,
        (err,data)=>{
        if(data==null){ 
            res.send({message:'user not found',code:404})
        }else{
        if (err) res.send({message:err.message,code:500})
        else
        res.send(data)
        }
        
    })
})
module.exports = router;