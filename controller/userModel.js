const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'5d'})
}
//log in 
const logIn=async(req,res)=>{
    const{email,password}=req.body
    console.log(password)

    try{
        const user=await User.findOne({email})
        console.log(user)
        if(user){
          const match=await bcrypt.compare(password,user.password)
          console.log(match)
         if(match){
          const token=createToken(user._id)
          res.status(200).json({email,token})
         }
         else{
          const cannot='password cannot Match'
          res.status(400).json({cannot})

         }
        }

        else {
          const cannot='canot find user'
          res.status(400).json({cannot})
        }

    }catch (error) {
      
    res.status(400).json({error: error.message})
  }
}

//signUp
const signUp=async(req,res)=>{
    const{email,password}=req.body
   try{
    const userExists=await User.findOne({email})
    if(userExists){
        throw Error('Email already in use')
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const user=await User.create({email,password:hash})
    const token=createToken(user._id)
    res.status(200).json({email,token})


   } 
   catch (error) {
    res.status(400).json({error: error.message})
  }

}
module.exports={logIn,signUp}