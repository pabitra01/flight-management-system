import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectToDatabase } from "./mongodb";
import User from "@/models/user";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async ({email,password}) => {
      await connectToDatabase();
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const user = await User.findOne({ email });
if(!user){
  throw new Error("user not found")
}      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      return {  username: user.username, email: user.email };
    },
  }),
  ],
  pages:{signIn:"/login"}
})
