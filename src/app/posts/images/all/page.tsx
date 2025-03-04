import NavBar from "@/components/navLinks";
import ImgPostList from "@/components/posts/images/imgPostList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.imgPost.findMany();
  const comments = await db.comment.findMany({
    where: {
      imgPostId: {
        not: null,
      },
    },
  });

      // Add postType to each post manually
      const postsWithType = posts.map((post) => ({
        ...post,
        type: "IMAGE",
      }));

  return (
    <>
      <div className="flex">
        <NavBar />
        <ImgPostList posts={postsWithType} comments={comments} />
      </div>
    </>
  );
}
