import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const createToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET_KEY )
}

// route for User Login
const loginUser = async (req ,res) =>{
   try{
        const { email , password} = req.body

        if(!validator.isEmail(email)){
            res.json({success:false , message:"Please enter the valid email"})
        }
        if(password.length < 8){
            res.json({success:false , message:"Please enter the strong password"})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false , message:"User doesn't exists"})
        }

        // Password match
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false , message:"Invalid Credentials"})
        }

        const token = await createToken(user._id)
        res.json({success:true , token:token})

   }catch(e){
        console.log(e)
        res.json({success:false , message:e.message})
   }
}


// route for user Register 

const registerUser = async (req ,res) =>{
    try{
        const {name , email , password} = req.body
        
        // checking user already exists
        const exists = await userModel.findOne({email : email})
        if(exists){
            return res.json({success:false , message: "User already exists"})
        }
        
        // validating email and password
        if(!validator.isEmail(email)){
            return res.json({success:false , message: "Please enter the valid email"})
        }
        if(password.length < 8){
            return res.json({success:false , message: "Please enter a Strong password"})
        }
        // Hash the pasword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const user = await userModel.create(newUser)

        const token = createToken(user._id)
        res.json({success: true ,token : token})
        
    }catch(e){
        console.log(e.message)
        res.json({success:false , message: e.message})
    }
}

// route for Admin login

const adminLogin = async (req , res) =>{
    try{
        const {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password , process.env.JWT_SECRET_KEY)
            res.json({success:true ,token : token})
        }else{
            res.json({success:false , message:"Invalid credentials"})
        }
    }catch(e){
        console.log(e)
        res.json({success:false , message:e.message})
    }
}

export {loginUser , registerUser , adminLogin}