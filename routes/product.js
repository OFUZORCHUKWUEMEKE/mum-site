const mongoose = require('mongoose')

const Product = require('../models/Product')

const router = require('express').Router()


router.get('/',async(req,res)=>{
    try{
        const product = await Product.find({})
        res.status(200).json(product)
    }catch(err){  
        res.status(400).json(err)
    }
})

router.post('/',async(req,res)=>{
    try { 
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json('Deleted Sucessfully')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params

    try {
        const newProduct = await Product.findByIdAndUpdate(id,
            {$set:req.body}
            ,{new:true}
            )
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router