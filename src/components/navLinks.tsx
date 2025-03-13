"use client";


import { Button, Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import paths from "@/paths";

export default function NavLinks() {
  return (
    <>
      <Card
        isBlurred
        className="flex items-center justify-center w-5/6 lg:w-1/6 mx-8 my-4 h-min"
      >
      
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none"
            onPress={() => redirect(paths.home())}
          >
            All
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none"
            onPress={()=>redirect(paths.imgPostsListPage())}
          >
            Drawing
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none"
            onPress={() => redirect(paths.textPostsListPage())}
          >
            Writing
          </Button>
          <Button
            className="w-full bg-transparent text-xl hover:bg-white/25 py-2 px-4 rounded-none"
            onPress={() => redirect(paths.audioPostListPage())}
          >
            Musics
          </Button>
      
      </Card>
    </>
  );
}
