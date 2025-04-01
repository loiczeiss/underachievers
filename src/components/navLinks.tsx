"use client";


import { Button, Card } from "@heroui/react";
import { redirect } from "next/navigation";
import paths from "@/paths";

export default function NavLinks() {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center w-5/6 lg:w-1/6 mx-8 my-4 h-min dark:bg-black/25"
      >
      
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none dark:text-zinc-300"
            onPress={() => redirect(paths.home())}
            id="All"
          >
            All
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none dark:text-zinc-300"
            onPress={()=>redirect(paths.imgPostsListPage())}
            id="Drawing"
          >
            Drawing
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none dark:text-zinc-300"
            onPress={() => redirect(paths.textPostsListPage())}
            id="Writing"
          >
            Writing
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none dark:text-zinc-300"
            onPress={() => redirect(paths.audioPostListPage())}
            id="Musics"
          >
            Musics
          </Button>
      
      </Card>
    </>
  );
}
