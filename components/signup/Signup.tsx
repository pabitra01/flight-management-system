"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

import { redirect } from "next/navigation";
import { loginHandler } from "../actions/login";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { signUpUser } from "@/lib/session";

const Signup = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/");
    }
  }, [session]);
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
              const username = formData.get("username") as string;
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              const response = await signUpUser(email, username, password);
              if (response.success) {
                await loginHandler(email, password);
                toast.success("Success");
                window.location.reload;
              } else {
                toast.message("User already exists");
              }
            }}
          >
            <div className=" flex flex-col gap-4">
              <Input
                id="name"
                placeholder="Enter username"
                name="username"
                required
              />
              <Input
                id="email"
                placeholder="Enter email"
                name="email"
                type="email"
                required
              />
              <Input
                id="password"
                placeholder="Enter password"
                name="password"
                required
              />
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
