let crypt=require('bcrypt')

exports.encryptPassword=(req,res,next)=>{
    req.body.password = crypt.hashSync(req.body.password, 10);
    next()
  }

exports.validatePassword=(req,res,next)=>{
    if(req.body.password.length<8) res.send({message:'Password too short',code:500})
    else
    next()
  }
