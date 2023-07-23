import express from "express";
import dotenv from "dotenv"
import colors from "colors";
import morgan from "morgan";
import { connect } from "mongoose";
import connectDB from "./cofig/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from "path"

import cors from 'cors'

// configure dotenv
dotenv.config()

// database config
connectDB()

// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('*' , function(req,res){
 res.sendFile(path.join(__dirname , './client/build/index.html'))
});







// res api
app.get('/', (req, res)=>{
    res.send({
        message:'welcome to ecommerce website'

    })

})
// port
const PORT = process.env.PORT  || 8080;

// run listner
app.listen(PORT, ()=>{
    console.log(`server is running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white)
})


