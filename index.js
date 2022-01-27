const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const userRoute = require('./routes/User')
const orderRoute = require('./routes/order')

const PORT = 4000;

require('dotenv').config()
// mongoose.connect(process.env.MONGO_URL,async()=>{
//    console.log('Connected Successfully')
//    app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`))
// })
mongoose.connect("mongodb://localhost:27017/mumSite", {useNewUrlParser: true}).then(()=>{
   console.log('connected successfully')
   app.listen(PORT,()=>console.log('server running on PORT 4000'))
});



app.use(cors())
app.use(express.json())



app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)


app.use((req,res,next)=>{
   const err = new Error('Not Found')
   err.status = 404
   next(err)
})
 
app.use((err,req,res,next)=>{
   res.status(err.status || 500)
   res.json({
      error:{
         message:err.message
      }
   })
})

