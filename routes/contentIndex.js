let express = require('express');
let router = express.Router();
let content = require('../mongo/contentSchema.js');
let mongoose = require('mongoose');
let session=require('express-sesssion');

let conn=mongoose.connection;

router.get('/',(req,res,next)=>{
  content.find({},'_id Title Type',(err,data)=>{
    active=[]
    indexData=[]
    for(let i=0;i<data.length;i++){
      if(i==0){
        indexData.push({Title:data[i].Title,id:data[i]._id,Type:data[i].Type,active:true})
      }else{
        indexData.push({Title:data[i].Title,id:data[i]._id,Type:data[i].Type,active:false})
      }
    }
    res.send(indexData)
  })
})
module.exports = router;