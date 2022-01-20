const Order = require('../models/Order')


const router = require('express').Router()


router.get('/',async(req,res)=>{
    try {
      const order = await Order.find({})
      res.status(200).json(order)  
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/',async(req,res)=>{
    try {
        const newOrder = new Order(req.body)
        const savedOrder = newOrder.save()
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    const {id} = req.params
    try{
       await Order.findByIdAndDelete(id)
       res.status(200).json('succefully deleted an Order')
    }catch(err){
       res.status(500).json(error)
    }
})


module.exports = router 