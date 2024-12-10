"use client";

import Link from "next/link";
import { Card } from "@nextui-org/react";

export default function NavBar() {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center lg:w-1/6 mx-8 my-4 h-min"
      >
        <ul className="w-fit  text-center w-full  text-xl">
          <li className="hover:bg-white/25 py-2 px-4 rounded-xl">All</li>
          <li className="hover:bg-white/25 py-2 px-4 rounded-xl">Drawing</li>
          <li className="hover:bg-white/25 py-2 px-4 rounded-xl">Writing</li>
          <li className="hover:bg-white/25 py-2 px-4 rounded-xl">Musics</li>
        </ul>
      </Card>
    </>
  );
}
