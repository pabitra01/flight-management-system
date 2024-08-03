"use server"

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const loginHandler=async(email:string,password:string)=>{

    if(!email || !password) throw new Error("Please provie all fields");
    try {
        await signIn("credentials",{
            email,password
        })
        return {success:true}
    } catch (error) {
        if(isRedirectError(error)){
            return {success:true}
        }
        return {success:false}

    } 
}
