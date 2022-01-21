const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')



// Register 
 router.post('/register',async(req,res)=>{
       const {username,password,email} = req.body
        try{
            const hash = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password,hash)
             const user = await  User.create({
                 username,
                 password:hashedPassword,
                 email,
             })
            //  const savedUser = await user.save()
             res.status(200).json(user)
        }catch(err){
            res.status(400).send({message:'something went wroong'})
        }

 })
// Login
router.post('/login',async(req,res)=>{
    const {password,email} = req.body
    const user = await User.findOne({email})
    if(user){
        const originalPassword = await bcrypt.compare(password,user.password)
        if(originalPassword){
            res.status(200).json(user)
        }else{
            res.status(400).json('Invalid Password')
        }
    }else{
        res.status(400).send({message:'something went wroong'})
    }
})

 







module.exports = router


