import { db } from "@/db";
import AudioPostShow from "@/components/posts/audio/audioPostShow";
import type { Audio, Comment } from "@prisma/client";
interface PostShowPageProps {
  params: Promise<{ id: string }>;
}


export default async function AudioPostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const {id} = params;

  const post = await db.audioPost.findFirst({where:{id}})
  const audio = await db.audio.findFirst({where:{id: post?.audioId}})

  const comments = await db.comment.findMany({where:{audioPostId: id}})

  if(!post){
      return <div className="flex justify-center">Post not found.</div>;
  }

  return(
    <div className="flex justify-center">
    <AudioPostShow post={post} audio={audio as Audio} comments={comments} />
  </div>
  )
}