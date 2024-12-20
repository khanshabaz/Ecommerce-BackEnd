const express=require("express");
const server=express();
const mongoose = require('mongoose');
const productsRouter=require("./routes/Products")
const brandsRouter=require("./routes/Brands")
const categoriesRouter=require("./routes/Categories")
const authRouter=require("./routes/Auth")
const userRouter=require("./routes/Users")
const cartRouter=require("./routes/Carts")
const orderRouter=require("./routes/Orders")
const cors = require('cors')
//middlewares

server.use(cors({
  exposedHeaders:['X-Total-Count']
}))
server.use(express.json())
server.use('/products',productsRouter.router)
server.use('/brands',brandsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/auth',authRouter.router)
server.use('/users',userRouter.router)
server.use('/cart',cartRouter.router)
server.use('/orders',orderRouter.router)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
console.log("database connected")
}

server.get('/',(req,res)=>{
    res.json({status:"Success"})
})

server.listen(3000,()=>{
    console.log("Server Started");
})