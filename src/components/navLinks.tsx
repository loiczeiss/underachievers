'use client';

import { Button, Card } from '@heroui/react';
import { redirect } from 'next/navigation';
import paths from '@/paths';

export default function NavLinks() {
  return (
    <>
      <Card
        isBlurred
        className="mx-8 my-4 flex h-min w-5/6 items-center justify-center lg:w-1/6 dark:bg-black/25"
      >
        <Button
          className="w-full rounded-none bg-transparent px-4 py-2 text-xl hover:bg-white/25 dark:text-zinc-300"
          onPress={() => redirect(paths.home())}
          id="All"
        >
          All
        </Button>
        <Button
          className="w-full rounded-none bg-transparent px-4 py-2 text-xl hover:bg-white/25 dark:text-zinc-300"
          onPress={() => redirect(paths.imgPostsListPage())}
          id="Drawing"
        >
          Drawing
        </Button>
        <Button
          className="w-full rounded-none bg-transparent px-4 py-2 text-xl hover:bg-white/25 dark:text-zinc-300"
          onPress={() => redirect(paths.textPostsListPage())}
          id="Writing"
        >
          Writing
        </Button>
        <Button
          className="w-full rounded-none bg-transparent px-4 py-2 text-xl hover:bg-white/25 dark:text-zinc-300"
          onPress={() => redirect(paths.audioPostListPage())}
          id="Musics"
        >
          Musics
        </Button>
      </Card>
    </>
  );
}
