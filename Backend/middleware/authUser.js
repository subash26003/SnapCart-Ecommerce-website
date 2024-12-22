import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
    const {token} = req.headers 
    if(!token){
        return res.json({success:false , message : "Not Authorized Login Again"})
    }

    try {
        const token_decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.body.userId = token_decode.id 
        next()
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message : e.message})
    }
    
}


export default authUser

