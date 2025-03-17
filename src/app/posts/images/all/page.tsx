import NavBar from "@/components/navLinks";
import ImgPostList from "@/components/posts/images/imgPostList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.imgPost.findMany({ cacheStrategy: { swr: 60 } });
  const comments = await db.comment.findMany({
    cacheStrategy: { swr: 60 },
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
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <NavBar />
        <ImgPostList posts={postsWithType} comments={comments} />
      </div>
    </>
  );
}
