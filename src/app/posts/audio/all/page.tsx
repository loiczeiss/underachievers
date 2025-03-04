import NavLinks from "@/components/navLinks";

import AudioPostList from "@/components/posts/audio/audioPostsList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.audioPost.findMany();
  const audios = await db.audio.findMany()
  const comments = await db.comment.findMany({
    where: {
      audioPostId: {
        not: null,
      },
    },
  });

    // Add postType to each post manually
    const postsWithType = posts.map((post) => ({
      ...post,
      type: "AUDIO",
    }));
  


  return (
    <><div className="flex">
    <NavLinks/>
      
       <AudioPostList posts={postsWithType} audios={audios} comments={comments}  />
      </div>
    </>
  );
}