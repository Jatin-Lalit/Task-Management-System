const express=require("express");
const postrouter=express.Router();
const {User}=require("../model/users.js");
const jwt=require("jsonwebtoken");

const {verify}=require("../middleware/verify")
const {post}=require("../model/tasks.js")

const {auth}=require("../middleware/auth.middleware.js")



postrouter.get("/",async(req,res)=>{
    try{
        const userId = req.body.userID; // Retrieve the user ID from the authenticated request
        const tasks = await post.find({userID: userId }); // Find tasks that match the user ID
        res.send(tasks);
    
    }catch(err){
        console.log(err)
    }
    })
//////////
postrouter.post("/add", auth, async (req,res)=>{
    try{
        const { title, description, date, statu,userID } = req.body;
        const task=new post({title,description,date,statu,userID});
        await  task.save();
        res.send("task have been added")
    }catch(err){
        console.log(err);
    }
    })


    postrouter.delete("/delete/:id",async(req,res)=>{
      
        const id=req.params.id;
        const task=await post.findOne({_id:id})
        const uID=task.UserId;
        const uID_req=req.body.UserId;
        try{
            if(uID!=uID_req){
                res.send("can not delete this one")
            }else{
                await post.findByIdAndDelete({_id:id});
                res.send("deleted")
            }
        }catch(err){
            console.log(err)
        }
    })


    postrouter.patch("/update/:id",async(req,res)=>{
        const paylode=req.body;
        const id=req.params.id;
        const task=await post.findOne({_id:id})
        const uID=task.UserId;
        const uID_req=req.body.UserId;
        try{
            if(uTD!=uID_req){
                res.send("not authorized")
            }else{
                await post.findByIdAndUpdate({_id:id},paylode);
                res.send("updated")
            }

        }catch(err){
            console.log(err)
        }
    })
    /////////////////

    postrouter.delete("/delete/:id",verify(["Admin"]), async(req,res)=>{
        const role=req.role;
        console.log(role);
        if(role==="Admin"){
            const id=req.params.id;
            try{
                const task= post.findByIdAndDelete({_id:id});
                res.send("deleted successfuly")
            }catch(err){
                res.send("Error wile deleting data")
            }
        }
       
    })

module.exports={
    postrouter
}