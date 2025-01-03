import NavBar from "@/components/navLinks";
import AudioPostList from "@/components/posts/audio/audioPostsList";

import { db } from "@/db";

export default async function PostsListPage() {
  const posts = await db.audioPost.findMany();
  const audios = await db.audio.findMany()

  return (
    <><div className="flex">
    <NavBar/>
      
       <AudioPostList posts={posts} audios={audios}/>
      </div>
    </>
  );
}