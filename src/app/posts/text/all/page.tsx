import NavBar from "@/components/navLinks";
import PostList from "@/components/posts/text/PostTextList";
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
