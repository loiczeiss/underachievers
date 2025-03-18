"use client"
import { redirect } from "next/navigation";
import HeaderAuth from "./Header-auth";
import paths from "@/paths";
import { Button } from "@heroui/react";

export default function Header() {
  return (
    <>
      <header className="flex flex-row h-28 backdrop-blur-sm shadow-md dark:bg-black/50">
        <section className="lg:w-1/2 px-8 py-4 flex items-center">
          <Button className="text-xs  md:text-base lg:text-3xl p-0 bg-transparent hover:text-gray-300 dark:text-zinc-300 " onPress={()=>redirect(paths.home())}>UnderAchievers</Button>
        </section>
        <section className="w-1/2 flex items-center justify-end px-8">
          <HeaderAuth />
        </section>
      </header>
    </>
  );
}
