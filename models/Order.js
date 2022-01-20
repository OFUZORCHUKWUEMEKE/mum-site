const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema)