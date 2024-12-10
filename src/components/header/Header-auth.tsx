"use client"

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";


import  Image from "next/image"
import { useSession } from "next-auth/react";

import * as actions from "@/actions";
import PostSelection from "../post-selection";

export default function HeaderAuth() {
  const session = useSession();
      
        let authContent: React.ReactNode
        if(session.status === "loading"){authContent = null}
        else if(session.data?.user){
          authContent = (<>
            <PostSelection/>
            <Popover placement="left" >
              <PopoverTrigger>
                <Avatar src={session.data.user?.image || ""} className="lg:ml-8 ml-4 w-8 h-8"/>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4">
                  <form action={actions.signOut}>
                    <Button type="submit">Sign Out</Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover></>
          );
        } else {
          authContent = (
            <>
             
                <form action={actions.signIn}>
                  <Button type="submit" color="default" variant="solid" >
                    Sign In
                  </Button>
                </form>
            
             
              
             
            
            </>
          );
        }
  return authContent
}
