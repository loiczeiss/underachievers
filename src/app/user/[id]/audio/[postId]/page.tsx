import { db } from "@/db";
import * as actions from "@/actions";
import UserAudioPostShow from "@/components/posts/user/audio/UserAudioPostShow";

interface PostShowPageProps {
  params: Promise<{
    postId: string;
    id: string;
  }>;
}

export default async function AudioPostShowPage(props: PostShowPageProps) {
  const params = await props.params;

  const post = await db.audioPost.findFirst({ where: { id: params.postId } });
  const audio = await db.audio.findFirst({ where: { id: post?.audioId } });
  const comments = await db.comment.findMany({
    where: { audioPostId: params.postId },
  });
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }
  const deleteAudioPostAction = actions.deleteAudioPost.bind(
    null,
    post.id,
    post.userId,
    audio?.publicId as string
  );
  return (
    <div className="flex justify-center">
      <UserAudioPostShow
        post={post}
        deleteAudioPost={deleteAudioPostAction}
        audio={audio}
        comments={comments}
      />
    </div>
  );
}
