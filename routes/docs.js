let express = require('express');
let router = express.Router();
let content = require('../mongo/contentSchema.js');
let mongoose = require('mongoose');
let formidable = require('formidable');
let fs = require('fs');
let path=require('path')
let session=require('express-sesssion');

router.post('/uploadImage',(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let extension=path.extname(files.filetoupload.name).toLowerCase()
      if (extension == '.png' || extension=='.jpg' 
      || extension=='.jpeg' || extension=='.gif'){
        let oldpath = files.filetoupload.path;
        let newpath = 'public/images/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send({code:200,route:newpath});
        });
      }else{
        res.send({code:500,message:'format not allowed'})
      }
  })
  })
  router.post('/uploadSlide',(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let extension=path.extname(files.filetoupload.name).toLowerCase()
      if (extension == '.pdf'){
        let oldpath = files.filetoupload.path;
        let newpath = 'public/slides/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send({code:200,route:newpath});
        });
      }else{
        res.send({code:500,message:'format not allowed'})
      }
  })
  })
  router.delete('/removeFile',(req,res,next)=>{
    let fs = require('fs');
    let filePath = req.body.filetoremove; 
    fs.unlinkSync(filePath);
    res.send({code:200,message:filePath+" removed"})
  })

  module.exports = router;