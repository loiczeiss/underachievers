import NavLinks from "@/components/navLinks";

import AudioPostList from "@/components/posts/audio/audioPostsList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.audioPost.findMany({ cacheStrategy: { swr: 60 } });
  const audios = await db.audio.findMany({ cacheStrategy: { swr: 60 } });
  const comments = await db.comment.findMany({
    where: {
      audioPostId: {
        not: null,
      },
    },
    cacheStrategy: { swr: 60 },
  });

  // Add postType to each post manually
  const postsWithType = posts.map((post) => ({
    ...post,
    type: "AUDIO",
  }));

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <NavLinks />

        <AudioPostList
          posts={postsWithType}
          audios={audios}
          comments={comments}
        />
      </div>
    </>
  );
}
