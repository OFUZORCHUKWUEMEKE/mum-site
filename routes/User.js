const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')



router.get('/',async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }   
})

router.delete('/:id',async(req,res)=>{
     const {id} = req.params
     try {
         await User.findByIdAndDelete(id)
         res.status(200).json('Successfully deleted')
     } catch (error) {
         res.status(500).json(error)
     }
})





module.exports = router