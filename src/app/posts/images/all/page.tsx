import NavBar from "@/components/navLinks";
import ImgPostList from "@/components/posts/images/imgPostList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.imgPost.findMany();

  return (
    <><div className="flex">
    <NavBar/>
      
       <ImgPostList posts={posts}/>
      </div>
    </>
  );
}