"use server"

import { IUser } from "@/interface/user";
import { auth } from "./auth";

export const getUser=async(setUser:(a:any)=>void)=>{
    try {
        
        const session = await auth();
if(session?.user){
    setUser(session.user)
}    } catch (error) {
        console.log(error)
    }
  }