"use server"

import { signIn } from "@/lib/auth";

export const loginHandler=async(email:string,password:string)=>{

    if(!email || !password) throw new Error("Please provie all fields");
    try {
        await signIn("credentials",{
            email,password
        })
    } catch (error) {
        //error
    } 
}
