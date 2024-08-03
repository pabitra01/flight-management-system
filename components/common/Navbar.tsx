import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();
  function getFirstLetter(str?: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase();
  }
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div className="container mx-auto flex justify-between items-center h-[70px]">
        <div className="text-xl font-semibold">Flights</div>
        {session.status === "authenticated" ? (
          <div className="flex gap-5 items-center">
            <div
              className="font-medium text-black/70 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
            <div className="bg-primary text-white w-[35px] h-[35px] rounded-full font-bold flex justify-center items-center">
              {getFirstLetter(session.data?.user?.email || "")}
            </div>
          </div>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
      <div className="border-b-2 border-input"></div>
    </>
  );
};

export default Navbar;
