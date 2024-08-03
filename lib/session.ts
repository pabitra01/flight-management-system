"use server"

import { IUser } from "@/interface/user";
import { auth } from "./auth";
import { connectToDatabase } from "./mongodb";
import User from "@/models/user";

export const getUser=async(setUser:(a:any)=>void)=>{
    try {
        
        const session = await auth();
if(session?.user){
    setUser(session.user)
}    } catch (error) {
//error
    }
  }

export const signUpUser=async(email:string,username:string,password:string)=>{
   try {
    if (!email || !password || !username) {
        throw new Error("Please provide all credentials");
      }
      await connectToDatabase();
      const user = await User.findOne({ email });
      await User.create({
        username,
        email,
        password,
      });
      return {success:true}
   } catch (error) {
    return {success:false}

   }
}