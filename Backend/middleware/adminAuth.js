import jwt from "jsonwebtoken"

const adminAuth = async (req , res , next) =>{
    try{
        const {token} = req.headers
        if(!token){
            return res.json({sucess:false , message : "Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({sucess:false , message:"Not Authorized Login Again"})
        }
        next()

    }catch(e){
        console.log(e)
        res.json({sucess:false , message: e.message})
    }
}

export default adminAuth