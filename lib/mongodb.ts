import mongoose from "mongoose"

export const connectToDatabase=async ()=>{
  try {
    if(mongoose.connections && mongoose.connections[0].readyState) return;
    const {connection}= await mongoose.connect(
      process.env.MONGODB_URI as string
      
    )
    console.log("connnected to database" + connection.host)
  } catch (error) {
    throw new Error("Error connecting to database")
  }
}