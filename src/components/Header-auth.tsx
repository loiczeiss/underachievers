"use client"

import { Avatar, Button } from "@nextui-org/react";
import { useState } from "react";

import  Image from "next/image"
import TopicSelection from "./topic-selection";

export default function HeaderAuth() {
        const [connected, setConnected] = useState(1)
        let authContent: React.ReactNode
        if(connected === 0){
            authContent = (
                <div className="flex">
                <Button className="mx-4 rounded w-44 h-14 bg-[#f2faff] shadow text-2xl">
                  Sign In
                </Button>
                <Button className="rounded w-44 h-14 bg-white/20 bg-[#f2faff] shadow text-2xl">
                  Sign Up
                </Button>
              </div>
            )
        } else {
            authContent=(
                <div className="flex items-center">
                    <TopicSelection/>
                    <Avatar className="ml-4"/>
                </div>
            )
        }
  return authContent
}
