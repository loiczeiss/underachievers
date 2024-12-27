"use client";

import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import { useSession } from "next-auth/react";

import * as actions from "@/actions";
import PostSelection from "../post-selection";
import { redirect } from "next/navigation";
import paths from "@/paths";

export default function HeaderAuth() {
  const session = useSession();


  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <PostSelection />
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar
              src={session.data.user?.image || ""}
              className="lg:ml-8 ml-4 w-8 h-8"
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 flex flex-col items-center">
              <p className="mb-4 text-center">{session.data.user.name}</p>
              <Button className="mb-4" onClick={()=>redirect(paths.userPostsPage(session.data.user?.id as string))}>My posts</Button>
              <form action={actions.signOut}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <>
        <form action={actions.signIn}>
          <Button type="submit" color="default" variant="solid">
            Sign In
          </Button>
        </form>
      </>
    );
  }
  return authContent;
}
