'use client';

import { Card } from '@heroui/react';
import { Dispatch, SetStateAction } from 'react';

interface NavBarProps {
  setMediaTypeFilter: Dispatch<SetStateAction<number>>;
}
export default function NavFilters({ setMediaTypeFilter }: NavBarProps) {
  return (
    <>
      <Card
        isBlurred
        className="mx-8 my-4 flex h-min items-center justify-center lg:w-1/6 dark:bg-black/25"
      >
        <ul className="  w-full text-center  text-xl">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <li
            className="rounded-xl px-4 py-2 hover:bg-white/25 dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(0)}
          >
            All
          </li>
          <li
            className="rounded-xl px-4 py-2 hover:bg-white/25 dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(1)}
          >
            Drawing
          </li>
          <li
            className="rounded-xl px-4 py-2 hover:bg-white/25 dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(2)}
          >
            Writing
          </li>
          <li
            className="rounded-xl px-4 py-2 hover:bg-white/25 dark:text-zinc-300 dark:hover:bg-black/75"
            onClick={() => setMediaTypeFilter(3)}
          >
            Musics
          </li>
        </ul>
      </Card>
    </>
  );
}
