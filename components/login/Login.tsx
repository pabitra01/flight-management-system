"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { loginHandler } from "../actions/login";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Login = () => {
  const session = useSession();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await loginHandler(email, password);
    toast.success("Login Success");
    window.location.reload();
  };
  useEffect(() => {
    console.log(session);
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
              Login
            </h1>{" "}
            <p className=" text-sm text-[#7B7B83]">
              Enter your email below to create your account
            </p>{" "}
          </div>
          <form action={handleLogin}>
            <div className=" flex flex-col gap-4">
              <Input id="email" placeholder="name@example.com" name="email" />
              <Input id="password" placeholder="password" name="password" />
              <Button>Login with Email</Button>
            </div>
          </form>
        </div>

        <Link href={"/signup"}>
          <Button variant="outline" className=" absolute right-5 top-5">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
