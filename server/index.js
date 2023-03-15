import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import cors from "cors"


const app = express()
dotenv.config() 
app.use(express.json());
app.use(cors());
app.use("/auth",authRoutes);
mongoose.set("strictQuery", true);

const PORT = process.env.PORT||5000;
// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(()=>{
//         app.listen(PORT, ()=> console.log(`connected to PORT ${PORT}`))
//     }).catch((error)=> console.log(`server not connected duo to ${error}`));

mongoose
        .connect("mongodb://127.0.0.1:27017/mern", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            app.listen(PORT, ()=>console.log(`connected to ${PORT}`))
        }).catch((error)=>console.log("failed to connect to database"));