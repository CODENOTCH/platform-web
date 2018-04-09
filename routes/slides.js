let express = require('express');
let router = express.Router();
let slides = require('../mongo/slideSchema.js');
let mongoose = require('mongoose');
let session=require('express-sesssion');

let conn=mongoose.connection;

router.post('/insertSlides',(req,res,next)=>{
    let slidesData={
        Slideids:req.body.slideids,
        Routes:req.body.slideRoute,
      }
      let newSlides=new slides(slidesData)
      newSlides.save((err,userData)=>{
        if(err){
          res.send({ code: 500, message: err.message })
        }
        res.send(userData)
      }) 
})
router.get('/getSlides',(req,res,next)=>{
  slides.find({_id:req.query.slideid},(err,data)=>{
    res.send(data)
  })
})
module.exports = router;