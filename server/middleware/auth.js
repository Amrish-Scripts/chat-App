import User  from "../models/user.js"
import jwt from "jsonwebtoken"


// middleware to proctect the routes


export const proctectRoute = async(req , res, next)=>{

    try {
        
        const token = req.headers.token 

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if(!user) return res.json ({success:false , message:"user not found"})

            req.user = user;
            next();


    } catch (error) {
        console.log(error.message)

        res.json ({success:false , message:error.message})
        
    }
}