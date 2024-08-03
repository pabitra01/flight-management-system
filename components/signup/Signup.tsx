import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { redirect } from "next/navigation";
import { loginHandler } from "../actions/login";

const Signup = () => {
  return (
    <div className=" flex w-screen h-screen ">
      <div className=" bg-[#18181B]  md:flex hidden h-full w-1/2"></div>
      <div className="  justify-center relative flex items-center md:w-1/2 px-5 w-full h-full">
        <div className=" flex flex-col gap-7 lg:w-[400px] w-full ">
          <div className=" flex flex-col gap-2 text-center">
            <h1 className=" text-2xl text-[#09090B] font-semibold tracking-tight">
              Create an account
            </h1>{" "}
            <p className=" text-sm text-[#7B7B83]">
              Enter your email below to create your account
            </p>{" "}
          </div>
          <form
            action={async (formData: FormData) => {
              "use server";
              const username = formData.get("username") as string;
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
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
              await loginHandler(email, password);
              redirect("/");
            }}
          >
            <div className=" flex flex-col gap-4">
              <Input id="name" placeholder="name" name="username" />
              <Input id="email" placeholder="name@example.com" name="email" />
              <Input id="password" placeholder="password" name="password" />
              <Button>Sign up with Email</Button>
            </div>
          </form>
        </div>

        <Link href={"/login"}>
          {" "}
          <Button variant="outline" className=" absolute right-5 top-5">
            Login{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
