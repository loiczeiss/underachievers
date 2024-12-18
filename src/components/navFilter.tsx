"use client";

import Link from "next/link";
import { Card } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
interface NavBarProps {
  setMediaTypeFilter: Dispatch<SetStateAction<number>>;
}
export default function NavBar({ setMediaTypeFilter }: NavBarProps) {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center lg:w-1/6 mx-8 my-4 h-min"
      >
        <ul className="w-fit  text-center w-full  text-xl">
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => setMediaTypeFilter(0)}
          >
            All
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => setMediaTypeFilter(1)}
          >
            Drawing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => setMediaTypeFilter(2)}
          >
            Writing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl"
            onClick={() => setMediaTypeFilter(3)}
          >
            Musics
          </li>
        </ul>
      </Card>
    </>
  );
}
