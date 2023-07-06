const mongoose = require("mongoose");
const taskSchema=mongoose.Schema({
   title:{type:String,required:true},
   description:{type:String,required:true},
   date:{type:String,required:true},
  
   statu:{type:Boolean,enum:[true,false],default:false},
   userID:{type:String,required:true}
    
});
const post=mongoose.model("tasks",taskSchema);

module.exports={
    post
}