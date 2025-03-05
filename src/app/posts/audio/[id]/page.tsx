import { db } from "@/db";
import AudioPostShow from "@/components/posts/audio/audioPostShow";
import type { Audio } from "@prisma/client";
interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function AudioPostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = await db.audioPost.findFirst({ where: { id } });
  const audio = await db.audio.findFirst({ where: { id: post?.audioId } });

  const comments = await db.comment.findMany({ where: { audioPostId: id } });
  const replies = await db.comment.findMany({
    where: {
      AND: [
        { audioPostId: id }, // Matches the specific audio post ID
        { parentId: { not: null } } // Ensures parentId exists (i.e., it's a reply)
      ]
    }
  });
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  return (
    <div className="flex justify-center">
      <AudioPostShow post={post} audio={audio as Audio} comments={comments} replies={replies} />
    </div>
  );
}
