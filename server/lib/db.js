import mongoose from "mongoose";

// function to connect to mongo db datbase

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it in Vercel → Project → Settings → Environment Variables."
    );
  }

  mongoose.connection.on("connected", () => console.log("database connected"));

  // Use dbName option so we never break Atlas URIs like:
  // mongodb+srv://.../?appName=Cluster0  (appending "/chat-app" would be invalid)
  await mongoose.connect(uri, {
    dbName: "chat-app",
    serverSelectionTimeoutMS: 15000,
  });
};