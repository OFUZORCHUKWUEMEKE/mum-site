const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {body} = require('express-validator')



// Register 
 router.post('/register',async(req,res,next)=>{  
    const {username,password,email} = req.body
        try{
         
            const usernamee = await User.findOne({username})
            const emaill = await User.findOne({email})
            if(usernamee){
                let err = new Error('Username already exists')  
                err.status = 400
                next(err)
                if(emaill){
                    let err = new Error('email already exists')
                    err.status = 400
                    next(err) 
                }
            }else{
                const hash = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(password,hash)
                 const user = await  User.create({
                     username,
                     password:hashedPassword,
                     email,
                 })
                //  const savedUser = await user.save()
                 res.status(200).json(user)
            }
         
        }catch(error){
           let err = new Error('something is wrong')
           err.status = 500
           next(err)
        }

 })
// Login
router.post('/login',async(req,res,next)=>{
    const {password,email} = req.body
    const user = await User.findOne({email})
    if(user){
        const originalPassword = await bcrypt.compare(password,user.password)
        if(originalPassword){
            res.status(200).json(user)
        }else{
           const err = new Error('Incorrect Password')
           err.status = 400
           next(err)
        }
    }else{
        const err = new Error('Incorrect Email Address')
        err.status =400
        next(err)
    }
})

 







module.exports = router


