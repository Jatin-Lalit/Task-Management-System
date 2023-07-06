const mongoose = require("mongoose");
const UsserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
    role:{type:String,enum:["User","Admin"],default:"User"}
});
const User=mongoose.model("user",UsserSchema);

module.exports={
    User
}