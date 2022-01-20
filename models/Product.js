const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    size:{
        type:['L','S','M']
    },
    img:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports = mongoose.model('Product',ProductSchema)