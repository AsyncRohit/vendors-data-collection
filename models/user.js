const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/lolo");

const userSchema=mongoose.Schema({
    shopname:String,
    name:String,
    address:String,
    age:Number
})

module.exports=mongoose.model("userModel", userSchema);