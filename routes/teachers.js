let express = require('express');
let router = express.Router();
let teacher = require('../mongo/teacherSchema.js');
let mongoose = require('mongoose');
let session=require('express-sesssion')

let conn=mongoose.connection;

router.post('/insertTeacher',(req,res,next)=>{
    let teacherData={
        DNI:req.body.DNI,
        Adress:req.body.adress,
        Phone:req.body.phone,
        Description:req.body.description,
        Links:req.body.links,
        Photo:req.body.photo,
        Birthdate: req.body.birthdate,
        bootcampID: req.body.bootcampid,
        userID:req.session.userid
      }
      let newTeacher=new teacher(teacherData)
      newTeacher.save((err,teacherData)=>{
        if(err) res.send({code: 500, message: err.message })
        else
        res.send(teacherData)
      }) 
})
router.get('/getTeacherInfo',(req,res,next)=>{
    if(req.session.userid){
        teacher.findOne({userID:req.session.userid},(err,data)=>{
            if(err) res.send("error")
            else
            res.send(data)
        })
    }else{
        res.send({message:'unauthorized',code:401})
    }
})
router.delete('/deleteTeacher',(req,res,next)=>{
    teacher.remove({userID:req.body.userid},(err,data)=>{
        if (err) res.send({message:err.message,code:500})
        else
        res.send(data)
    })
})
router.put('/updateTeacher',(req,res,next)=>{
    let newTeacher={
        DNI:req.body.DNI,
        Adress:req.body.adress,
        Phone:req.body.phone,
        Description:req.body.description,
        Links:req.body.links,
        Photo:req.body.photo,
        Birthdate: req.body.birthdate,
        bootcampID: req.body.bootcampid,
        userID:req.session.userid
      }
    teacher.findOneAndUpdate({userID:newTeacher.userID},newTeacher,
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