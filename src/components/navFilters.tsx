"use client";


import { Card } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";


interface NavBarProps {
  setMediaTypeFilter: Dispatch<SetStateAction<number>>;
}
export default function NavFilters({ setMediaTypeFilter }: NavBarProps) {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center lg:w-1/6 mx-8 my-4 h-min dark:bg-black/25"
      >
        <ul className="w-fit  text-center w-full  text-xl">
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(0)}
          >
            All
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={()=>setMediaTypeFilter(1)}
          >
            Drawing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(2)}
          >
            Writing
          </li>
          <li
            className="hover:bg-white/25 py-2 px-4 rounded-xl dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(3)}
          >
            Musics
          </li>
        </ul>
      </Card>
    </>
  );
}
