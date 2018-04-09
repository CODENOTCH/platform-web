let express = require('express');
let router = express.Router();
let develop = require('../mongo/developSchema.js');
let mongoose = require('mongoose');
let formidable = require('formidable');
let fs = require('fs');
let session=require('express-sesssion');

let conn=mongoose.connection;

router.post('/insertDevelopment',(req,res,next)=>{
  let DevelopData={
    Titles:req.body.devTitles,
    Contentids: req.body.contentids,
    Paragraphs:{
      Ptext: req.body.devPtext,
      Pposition:req.body.devPposition
    },
    Images:{
      route:req.body.devRoutes,
      imageposition: req.body.imageposition
    }
  }
  let newDevelopment=new develop(DevelopData)
  newDevelopment.save((err,devData)=>{
    if(err) res.send({code: 500, message: err.message })
    else
    res.send(devData)
  }) 
})
router.get('/getDevelopment',(req,res,next)=>{
  develop.find({_id:req.query.developid},(err,data)=>{
    developData=[];
    let id={
      id:data[0]._id
    }
    developData.push(id)
    for(let i=0;i<data[0].Paragraphs.Ptext.length;i++){
      let contData={
        type:'text',
        content:data[0].Paragraphs.Ptext[i],
        position: data[0].Paragraphs.Pposition[i]
      }
      developData.push(contData)
    }
    for(let j=0;j<data[0].Titles.length;j++){
      let TitleData={
        type:'Title',
        content:data[0].Titles[j]
      }
      developData.push(TitleData)
    }
    for(let t=0;t<data[0].Images.route.length;t++){
      let imgData={
        type:'img',
        content:data[0].Images.route[t],
        position: data[0].Images.imageposition[t]
      }
      developData.push(imgData)
    }
    res.send({
      id: data[0]._id,
      relatedIds:data[0].Contentids,
      data:developData})
  })
})
router.delete('/deleteDevelopment',(req,res,next)=>{
  develop.remove({_id:req.body.developid},(err,data)=>{
    if (err) res.send({message:err.message,code:500})
    else
    res.send(data)
})
})
router.put('/updateDevelopment',(req,res,next)=>{
    let developContent={
        Titles:req.body.devTitles,
        Contentids: req.body.contentids,
        Paragraphs:{
          Ptext: req.body.devPtext,
          Pposition:req.body.devPposition
        },
        Images:{
          route:req.body.devRoutes,
          imageposition: req.body.imageposition
        }
      }
  develop.findOneAndUpdate({_id:req.body.developid},developContent,
    (err,data)=>{
    if(data==null){ 
        res.send({message:'document no find',code:404})
    }else{
    if (err) res.send({message:err.message,code:500})
    else
    res.send(data)
    }
})
})
module.exports = router;
