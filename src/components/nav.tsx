"use client";

import Link from "next/link";
import { Card } from "@nextui-org/react";

export default function NavBar() {
  return (
    <>

        <Card isBlurred className="mx-8 my-4 ">
          <ul className="p-8    text-xl">
            <li className="">Drawing</li>
            <li className="mt-4">Writing</li>
            <li className="mt-4">Musics</li>
          </ul>
        </Card>
   
    </>
  );
}
