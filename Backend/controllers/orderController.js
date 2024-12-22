// Placing orders using COD Method 
import orderModel from "../models/orderModels.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"


// global variables
const currency = 'usd'
const deliveryCharges = 50

// gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// COD 
const placeOrder = async (req , res) =>{
    try {
        const {userId , items , amount , address} = req.body 
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment: false,
            date : Date.now()
        }

        const order = await orderModel.create(orderData)
        await order.save()

        await userModel.findByIdAndUpdate(userId , {cartdata : {}})

        res.json({success:true , message : "Order Placed"})

    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async ( req , res) => {
    try {
        const {userId , items , amount , address} = req.body 
        const { origin } = req.headers 

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "Stripe",
            payment: false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data:{
                currency : currency,
                product_data:{
                    name : item.name,
                },
                unit_amount : item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency : currency,
                product_data:{
                    name : "Delivery Charges",
                },
                unit_amount : deliveryCharges
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success : true , session_url : session.url})

    } catch (error) {
        console.log(error.message)
        res.json({success:false , message : error.message})
    }
}

//Verify Strip 

const verifyStripe = async (req , res) =>{
    try {
        const {orderId , success , userId} = req.body
        if(success){
            await orderModel.findByIdAndUpdate(orderId , {payment : true})
            await userModel.findByIdAndUpdate(userId , {cartData : {}})
            res.json({success : true , message : "Order Placed"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success : false})
        }
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message : error.message})
    }
}

// Placing orders using Razorpay Method 
const placeOrderRazorpay = async ( req , res) =>{

}



// All Orders data for Admin Panel
const allOrders = async (req , res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true , orders})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}

// User Order Data For frontend
const userOrders = async (req , res) =>{
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true , orders})
    } catch (error) {
        res.send({success: false , message : error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req , res) =>{
    try {
        const {orderId ,status } = req.body

        const order = await orderModel.findByIdAndUpdate(orderId , {status})

        res.json({success:true , message:"Status Updated"})

    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}

export {placeOrder , placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus,verifyStripe}