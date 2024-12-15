import Welcome from "@/components/welcome";
import { Card } from "@nextui-org/react";
import { db } from "@/db";
import Link from "next/link";
import { auth } from "@/auth";
import NavBar from "@/components/nav";

import AllPostList from "@/components/posts/all/AllPostsList";
export default async function Home() {
  const textPosts = await db.textPost.findMany({
    include: { user: true, comments: true },
  });
  
  const imgPosts = await db.imgPost.findMany({
    include: { user: true, comments: true },
  });
  
  // Combine the results into a unified array
  const allPosts = [...textPosts.map(post => ({ ...post, type: 'TEXT' })), 
                    ...imgPosts.map(post => ({ ...post, type: 'IMAGE' }))];
  
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
        <div className="flex flex-col lg:flex-row w-full">
          <NavBar />
      <AllPostList posts={allPosts}/>
        </div>
      </>
    );
  }
}

{
}
