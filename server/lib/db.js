import mongoose from "mongoose";

// function to connect to mongo db datbase

export const connectDB = async()=>{
    try{
        
        mongoose.connection.on("connected",()=> console.log('database connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch(error){
        console.log("database connection error",error)
    }
    }