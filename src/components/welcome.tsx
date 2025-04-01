"use client";
import { Button, Card } from "@heroui/react";
import { useState } from "react";

export default function Welcome() {
    const [isClosed, setIsClosed] = useState(false)
    function closeCard(){
        setIsClosed(true)
    }
  return (
    <div className={`${isClosed ? "hidden":"" } flex justify-center`} >
      <Card className="m-8 items-center w-2/3 self-center bg-white/25 md:bg-transparent backdrop-blur-sm dark:bg-black/50">
        <h1 className="dark:text-zinc-300 pt-4 text-base text-center lg:text-3xl">Welcome to UnderAchievers!</h1>
        <q className="w-2/3 text-center mt-4 lg:mt-8 text-zinc-600 drop-shadow-xl dark:text-zinc-200">
          For my seed, bless me with a soil. <br />
          To grow it big and strong, bless me with water.
          <br />
          For a magnificent tree, bless me with time and patience.
        </q>
        <p className="w-2/3 text-center mt-4 mb-8 dark:text-zinc-300">
          UnderAchievers is a place where ideas are rejuvenated, where you can
          expose what your creative mind birthed, and, if in need, expect an
          helping hand to guide you forward.
        </p>
        <Button id="Close" className="mb-4 bg-white/20 shadow dark:text-zinc-200" onPress={()=>closeCard()}>Close</Button>
      </Card>
    </div>
  );
}
