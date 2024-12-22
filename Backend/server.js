import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


// APP config 
const app = express()
const port = process.env.PORT || 3000
connectDB()  // connect to db
connectCloudinary() // connect the cloudinary

app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/product" , productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)

app.get('/' , (req , res) => {
    res.send("Server Working")
})



app.listen(port , () => {
    console.log("server is running")
})