exports.isAuth=(req,res,done)=>{
    if(req.user){
      done();
    }else{
      res.send(401)
    }
  
  }


  exports.sanitizerUser=(user)=>{
    return{id:user.id,role:user.role}
  }