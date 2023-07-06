const express=require("express");
const {User}=require("../model/users");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist.js");
const bcrypt = require("bcrypt");

const userrouter=express.Router();
userrouter.use(express.json());


userrouter.post("/signup",async(req,res)=>{
   
    try{
        const {name,email,pass,role} =req.body;
        const isPresent=await User.findOne({email});
       
        if(isPresent){
            res.send("Already Register");
        }else{
     bcrypt.hash(pass,5,async(err,hash_pass)=>{
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
           
          }else{
            let user=new User({name,email,pass:hash_pass,role});
            await user.save();
            res.send("Registration Completed")
          }
        
     })
        }
    }catch(err){
        console.log(err)
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        let user=await User.findOne({email});
        
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
              if (result) {
                res.send({
                  msg: "login success",
                  token: jwt.sign({ UserId: user._id }, "jatin", {
                    expiresIn: "100000m"
                  }),
                  refreshtoken: jwt.sign({ UserId: user._id }, "NXM", {
                    expiresIn: "300m"
                  })
                });
              }
            });
          }
        }catch(err){
        console.log(err.massage)
    }
})

userrouter.get("/getnewtoken",(req,res)=>{
    const refreshtoken=req.headers.authorization;
    jwt.verify(refreshtoken,"NXM",(errdecoded)=>{
        if(err){
            res.send("please login again");
        }else{
            const token=jwt.sign({UserId:decoded.UserId},"jatin",{expiresIn:"100m"}
            );
            res.send({"token":token})
        }
    })
})


userrouter.get("/logout",(req,res)=>{
    try{

     const token=req.headers.authorization
     blacklist.push(token);
     res.send("you are loged out")
    }catch(err){
        console.log(err.massage)
    }
})





module.exports={
    userrouter
}