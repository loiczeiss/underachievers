import NavBar from "@/components/nav";
import PostList from "@/components/posts/Post-list";
import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.textPost.findMany();

  return (
    <><div className="flex">
    <NavBar/>
      
        <PostList posts={posts} />
      </div>
    </>
  );
}
