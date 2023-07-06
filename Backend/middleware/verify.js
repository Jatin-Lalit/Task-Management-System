const verify=(permitedrole)=>{
    return(req,res,next)=>{
     const role=req.role;
     if(permitedrole.includes(role)){
         next()
     }else{
         return res.send("Unauthorised")
     }
    }
 }
 module.exports={
    verify
 }