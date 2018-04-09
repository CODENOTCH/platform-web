let express = require('express');
let router = express.Router();
let content = require('../mongo/contentSchema.js');
let slides = require('../mongo/slideSchema.js');
let developments=require('../mongo/developSchema.js');
let mongoose = require('mongoose');
let formidable = require('formidable');
let fs = require('fs');
let session = require('express-sesssion');

let conn = mongoose.connection;

router.post('/insertContent', (req, res, next) => {
  let ContentData = {
    Title: req.body.mainTitle,
    Type: req.body.Type,
    Paragraphs: {
      Ptext: req.body.pText,
      Pposition: req.body.Pposition
    },
    Images: {
      route: req.body.Routes,
      imageposition: req.body.imageposition
    },
    Subtitles: {
      subtitle: req.body.subTitles,
      subposition: req.body.subposition
    },
    Lists: {
      Ltext: req.body.Ltext,
      Lposition: req.body.Lposition
    }
  }
  let newContent = new content(ContentData)
  newContent.save((err, contentData) => {
    if (err) res.send({
      code: 500,
      message: err.message
    })
    else
      res.send(contentData)
  })
})
router.get('/getContent', (req, res, next) => {
  content.find({_id: req.query.contentid}, (err, data) => {
    contentData = [];
    let title = {
      type: 'title',
      content: data[0].Title
    }
    contentData.push(title)
    for (let i = 0; i < data[0].Paragraphs.Ptext.length; i++) {
      let contData = {
        type: 'text',
        content: data[0].Paragraphs.Ptext[i],
        position: data[0].Paragraphs.Pposition[i]
      }
      contentData.push(contData)
    }
    for (let j = 0; j < data[0].Lists.Ltext.length; j++) {
      let listData = {
        type: 'list',
        content: data[0].Lists.Ltext[j],
        position: data[0].Lists.Lposition[j]
      }
      contentData.push(listData)
    }
    for (let z = 0; z < data[0].Subtitles.subtitle.length; z++) {
      let subData = {
        type: 'subtitle',
        content: data[0].Subtitles.subtitle[z],
        position: data[0].Subtitles.subposition[z]
      }
      contentData.push(subData)
    }
    for (let t = 0; t < data[0].Images.route.length; t++) {
      let imgData = {
        type: 'img',
        content: data[0].Images.route[t],
        position: data[0].Images.imageposition[t]
      }
      contentData.push(imgData)
    }
    res.send({
      id: data[0]._id,
      data: contentData
    })
  })
})
router.delete('/deleteContent', (req, res, next) => {
  content.remove({
    _id: req.body.contentid
  }, (err, data) => {
    if (err) res.send({
      message: err.message,
      code: 500
    })
    else
      res.send(data)
  })
})
router.put('/updateContent', (req, res, next) => {
  let newContent = {
    Title: req.body.mainTitle,
    Type: req.body.Type,
    Paragraphs: {
      Ptext: req.body.pText,
      Pposition: req.body.Pposition
    },
    Images: {
      route: req.body.Routes,
      imageposition: req.body.imageposition
    },
    Subtitles: {
      subtitle: req.body.subTitles,
      subposition: req.body.subposition
    },
    Lists: {
      Ltext: req.body.Ltext,
      Lposition: req.body.Lposition
    }
  }
  content.findOneAndUpdate({_id: req.body.contentid}, newContent,(err, data) => {
      if (data == null) {
        res.send({
          message: 'document no find',
          code: 404
        })
      } else {
        contentData = [];
        let title = {
          type: 'title',
          content: data[0].Title
        }
        contentData.push(title)
        for (let i = 0; i < data[0].Paragraphs.Ptext.length; i++) {
          let contData = {
            type: 'text',
            content: data[0].Paragraphs.Ptext[i],
            position: data[0].Paragraphs.Pposition[i]
          }
          contentData.push(contData)
        }
        for (let j = 0; j < data[0].Lists.Ltext.length; j++) {
          let listData = {
            type: 'list',
            content: data[0].Lists.Ltext[j],
            position: data[0].Lists.Lposition[j]
          }
          contentData.push(listData)
        }
        for (let z = 0; z < data[0].Subtitles.subtitle.length; z++) {
          let subData = {
            type: 'subtitle',
            content: data[0].Subtitles.subtitle[z],
            position: data[0].Subtitles.subposition[z]
          }
          contentData.push(subData)
        }
        for (let t = 0; t < data[0].Images.route.length; t++) {
          let imgData = {
            type: 'img',
            content: data[0].Images.route[t],
            position: data[0].Images.imageposition[t]
          }
          contentData.push(imgData)
        }
        res.send({
          id: data[0]._id,
          data: contentData
        })
      }
    })
})
router.get('/programData', (req, res, next) => {
  content.find({}, (err, contentdata) => {
    slides.find({},(err,slidedata)=>{
      developments.find({},(err,developdata)=>{
        let program = []
        let url = req.protocol + '://' + req.get('host');
        let slideid=""
        let developid=""
        for (let i = 0; i < contentdata.length; i++) {
          for(let j=0;j < slidedata.length; j++){
            for(let s=0;s<slidedata[j].Slideids.length;s++){
              if(contentdata[i]._id==slidedata[j].Slideids[s]){
                slideid=slidedata[j].Slideids[s];
              }
            }
          }
          for(let z=0;z<developdata.length;z++){
            for(let t=0;t<developdata[z].Contentids.length;t++){
              if(contentdata[i]._id==developdata[z].Contentids[t]){
                developid=developdata[z].Contentids[t];
              }
          }
        }
          let content = {
            contenidosPath: url+'/?contentid='+contentdata[i]._id,
            slidesPath: url+'/?contentid='+slideid,
            desarrolloPath: url+'/?contentid='+developid,
            indexId: contentdata[i]._id
          }
          program.push(content)
        }
        let programData = {
          Index: {
            Route: url + '/contentIndex/'
          },
          programa: program
        }
        res.send(programData)
      })
    })
  })
})
module.exports = router;