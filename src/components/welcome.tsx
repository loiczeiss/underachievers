'use client';
import { Button, Card } from '@heroui/react';
import { useState } from 'react';

export default function Welcome() {
  const [isClosed, setIsClosed] = useState(false);
  function closeCard() {
    setIsClosed(true);
  }
  return (
    <div className={`${isClosed ? 'hidden' : ''} flex justify-center`}>
      <Card className="m-8 w-2/3 items-center self-center bg-white/25 backdrop-blur-sm md:bg-transparent dark:bg-black/50">
        <h1 className="pt-4 text-center text-base lg:text-3xl dark:text-zinc-300">
          Welcome to UnderAchievers!
        </h1>
        <q className="mt-4 w-2/3 text-center text-zinc-600 drop-shadow-xl lg:mt-8 dark:text-zinc-200">
          For my seed, bless me with a soil. <br />
          To grow it big and strong, bless me with water.
          <br />
          For a magnificent tree, bless me with time and patience.
        </q>
        <p className="mb-8 mt-4 w-2/3 text-center dark:text-zinc-300">
          UnderAchievers is a place where ideas are rejuvenated, where you can expose what your
          creative mind birthed, and, if in need, expect an helping hand to guide you forward.
        </p>
        <Button
          id="Close"
          className="mb-4 bg-white/20 shadow dark:text-zinc-200"
          onPress={() => closeCard()}
        >
          Close
        </Button>
      </Card>
    </div>
  );
}
