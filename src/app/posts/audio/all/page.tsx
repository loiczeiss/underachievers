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


  return (
    <><div className="flex">
    <NavLinks/>
      
       <AudioPostList posts={posts} audios={audios} comments={comments}  />
      </div>
    </>
  );
}