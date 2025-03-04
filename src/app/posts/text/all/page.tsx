import NavBar from "@/components/navLinks";
import PostList from "@/components/posts/text/PostTextList";
import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.textPost.findMany();
  const comments = await db.comment.findMany({
    where: { textPostId: { not: null } },
  });

      // Add postType to each post manually
      const postsWithType = posts.map((post) => ({
        ...post,
        type: "TEXT",
      }));
  return (
    <>
      <div className="flex">
        <NavBar />
        <PostList posts={postsWithType} comments={comments} />
      </div>
    </>
  );
}
