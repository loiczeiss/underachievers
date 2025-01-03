"use client";

import Link from "next/link";
import { Card } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

import { redirect } from "next/navigation";
import paths from "@/paths";
interface NavBarProps {
  setMediaTypeFilter: Dispatch<SetStateAction<number>>;
}
export default function NavLinks({ setMediaTypeFilter }: NavBarProps) {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center lg:w-1/6 mx-8 my-4 h-min"
      >
        <ul className="w-fit  text-center w-full  text-xl">
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => redirect(paths.home())}
          >
            All
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={()=>redirect(paths.imgPostsListPage())}
          >
            Drawing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => redirect(paths.textPostsListPage())}
          >
            Writing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => redirect(paths.audioPostListPage())}
          >
            Musics
          </li>
        </ul>
      </Card>
    </>
  );
}
