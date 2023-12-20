require('dotenv').config()
const cors=require('cors')

const express=require('express')
const mongoose = require('mongoose')

const itemsRoutes=require('./routes/items')
const userRouter=require('./routes/Users')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use(cors());

app.use("/uploads", express.static("uploads"))




app.use('/api/items',itemsRoutes)
app.use('/api/user',userRouter)
mongoose.connect(process.env.MONGO_URL).then(()=>{
        app.listen(process.env.PORT,()=>{
                console.log('listen on port ',process.env.PORT)
        }) 
}).catch((err)=>{
        console.log(err)
})