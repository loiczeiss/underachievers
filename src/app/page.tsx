import Welcome from "@/components/welcome";
import { Card } from "@nextui-org/react";
import { db } from "@/db";
import Link from "next/link";
import { auth } from "@/auth";
import NavBar from "@/components/navLinks";

import AllPostList from "@/components/posts/all/AllPostsList";
import HomeClientSide from "@/components/homeClientSide";
export default async function Home() {
  const textPosts = await db.textPost.findMany();

  const imgPosts = await db.imgPost.findMany();

  const audioPosts = await db.audioPost.findMany();
  // Combine the results into a unified array
  const allPosts = [
    ...textPosts.map((post) => ({ ...post, type: "TEXT" })),
    ...imgPosts.map((post) => ({ ...post, type: "IMAGE" })),
    ...audioPosts.map((post)=> ({...post, type: "AUDIO"}))
  ];
const audios = await db.audio.findMany()
  // // Sort posts by creation date
  // const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const session = await auth();

  if (!session || !session.user) {
    return (
      <>
        <Welcome />
      </>
    );
  } else {
    return (
      <>
        <HomeClientSide
          allPosts={allPosts}
          textPosts={textPosts}
          imgPosts={imgPosts}
          audioPosts={audioPosts}
          audios={audios}
        />
      </>
    );
  }
}

{
}
