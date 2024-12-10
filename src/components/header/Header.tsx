"use client"
import { redirect } from "next/navigation";
import HeaderAuth from "./Header-auth";
import paths from "@/paths";

export default function Header() {
  return (
    <>
      <header className="flex flex-row h-28 backdrop-blur-sm shadow-md">
        <section className="w-1/2 px-8 py-4 flex items-center">
          <button className="text-md lg:text-3xl " onClick={()=>redirect(paths.home())}>UnderAchievers</button>
        </section>
        <section className="w-1/2 flex items-center justify-end px-8">
          <HeaderAuth />
        </section>
      </header>
    </>
  );
}
