"use client";
import { Button, Card } from "@nextui-org/react";
import { useState } from "react";

export default function Welcome() {
    const [isClosed, setIsClosed] = useState(false)
    function closeCard(){
        setIsClosed(true)
    }
  return (
    <div className={`${isClosed ? "hidden":"" } flex justify-center`} >
      <Card className="m-8 items-center w-2/3 self-center bg-transparent backdrop-blur-sm ">
        <h1 className="pt-4 text-3xl">Welcome to UnderAchievers!</h1>
        <q className="w-2/3 text-center mt-8 text-slate-600 drop-shadow-xl">
          For my seed, bless me with a soil. <br />
          To grow it big and strong, bless me with water.
          <br />
          For a magnificent tree, bless me with time and patience.
        </q>
        <p className="w-2/3 text-center mt-4 mb-8">
          UnderAchievers is a place where ideas are rejuvenated, where you can
          expose what your creative mind birthed, and, if in need, expect an
          helping hand to guide you forward.
        </p>
        <Button className="mb-4 bg-white/20 shadow" onClick={()=>closeCard()}>Close</Button>
      </Card>
    </div>
  );
}
