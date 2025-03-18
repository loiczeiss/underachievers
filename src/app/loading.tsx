"use client"

import { Card, Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <>
<Card  className="flex flex-col w-1/5 bg-black/25 items-center justify-center place-self-center my-24 py-12
 "><Spinner size="lg" color="default" label="Loading..."/></Card>
    </>
  );
}
