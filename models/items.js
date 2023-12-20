const mongoose=require('mongoose')
const Schema=mongoose.Schema
const itemsShema=new Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    }
   
   
   
    })
module.exports=mongoose.model('Items',itemsShema)