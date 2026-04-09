import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";



// Create express app and HTTP server

const app = express();
const server = http.createServer(app)

// Initialize socket,io server

export const io = new Server(server,{
    cors:{origin :"*"}
})

//store Online Users

export const userSocketMap = {}; //{userId : socketId}

// Socket.io connection handler

io.on("connection" , (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user Connected", userId);

    if(userId) userSocketMap[userId]= socket.id;

    //emit online users to all connected clients

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("user Disconnected ", userId)
        for (const key in userSocketMap) {
            if (userSocketMap[key] === socket.id) {
                delete userSocketMap[key];
                break;
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


// Middleware setup

app.use(express.json({limit:"4mb"}))
app.use(cors());


//Routes setup
// Root URL: browsers open "/" — without this, Express returns "Cannot GET /"
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Chat API is running",
    docs: "Use /api/status, /api/auth, and /api/messages. For the web UI, deploy the Vite app (client/) and set VITE_BACKEND_URL to this API URL.",
  });
});
app.use("/api/status", (req,res)=> res.send("server is live"))
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)


//connect to mongo db


await connectDB();




if(process.env.NODE_ENV !== "production"){
const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=> console.log("server is running on PORT :"+PORT))
}

// export server for vercel

export default server;