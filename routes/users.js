var express = require('express');
var router = express.Router();
var user = require('../mongo/userSchema.js');
var mongoose = require('mongoose');
var crypt=require('bcrypt-nodejs');
var middlewares=require('../middlewares/usersMiddlewares.js');
var session=require('express-sesssion');

var conn=mongoose.connection;

router.post('/register',
middlewares.validatePassword,
middlewares.encryptPassword,
(req, res, next)=>{
  let userData={
    username:req.body.username,
    password:req.body.password,
    mail:req.body.mail,
    type:req.body.usertype
  }
  let newuser=new user(userData)
  newuser.save((err,userData)=>{
    if(err){
      res.send({ code: 500, message: err.message })
    }
    res.send(userData)
  }) 
})
router.get('/Logout',(req,res,next)=>{
  req.session.destroy();
  res.send({message:'logout',code:200})
})
router.post('/login',(req,res,next)=>{
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "X-Requested-With");
  user.find({username:req.body.username},(err,data)=>{
    if(crypt.compareSync(req.body.password, data[0].password)){
      req.session.userid=data[0]._id
      req.session.type=data[0].type
      res.send(data)
    }else{
      res.send({message:'unauthorized',code:401})
    }
  })
})
module.exports = router;
