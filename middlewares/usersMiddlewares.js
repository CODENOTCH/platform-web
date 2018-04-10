let crypt=require('bcrypt-nodejs')

exports.encryptPassword=(req,res,next)=>{
    var salt = crypt.genSaltSync(10);
    req.body.password =  crypt.hashSync(req.body.password, salt);
    next()
  }

exports.validatePassword=(req,res,next)=>{
    if(req.body.password.length<8) res.send({message:'Password too short',code:500})
    else
    next()
  }
