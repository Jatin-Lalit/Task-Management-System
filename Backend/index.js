const express =require("express");
const cors = require('cors');

const {connection}=require("./config/db.js")
const {userrouter}=require("./routers/user.router")
const {postrouter}=require("./routers/task.router.js")

const {auth}=require("./middleware/auth.middleware.js")
const app=express();
app.use(express.json());

app.use(cors());

app.use("/user",userrouter)
app.use(auth)
app.use("/write",postrouter)


    // "name":"dgfd",
    // "email":"002",
    // "pass":"dasdfsd",
    // "role":"User"
    

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


app.listen(9090,async()=>{

try{
    await connection
    console.log("connected to the DB")
}catch(err){
    console.log(err)
}
    console.log("Server is active");
})