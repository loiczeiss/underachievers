import Welcome from "@/components/welcome";
import { Card } from "@nextui-org/react";
import { db } from "@/db";
import Link from "next/link";
import { auth } from "@/auth";
import NavBar from "@/components/nav";
import PostList from "@/components/posts/Post-list";
export default async function Home() {
  const posts = await db.textPost.findMany();

//   const renderedPosts = posts.map((post) => {
//     return (
//    <Card>   <Link
//    key={post.id}
//    href={`/posts/${post.id}`}
//    className="flex justify-between items-center p-2 border rounded"
//  >
//    <div> {post.title}</div>
//    <div>View</div>
//  </Link></Card>
//     );
//   });
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
        <div className="flex">
          <NavBar />
      <PostList posts={posts}/>
        </div>
      </>
    );
  }
}

{
}
