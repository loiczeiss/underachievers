import { db } from "@/db";
import * as actions from "@/actions";
import UserTextPostShow from "@/components/posts/user/text/UserTextPostShow";

interface PostShowPageProps {
  params: Promise<{
    postId: string;
    id: string;
  }>;
}

export default async function PostShowPage(props: PostShowPageProps) {
  const params = await props.params;

  const comments = await db.comment.findMany({
    where: { textPostId: params.postId },
  });
  const replies = await db.comment.findMany({
    where: {
      AND: [
        { textPostId: params.id }, 
        { parentId: { not: null } } 
      ]
    }
  });

  const post = await db.textPost.findFirst({ where: { id: params.postId } });

  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  const deletePostAction = actions.deletePost.bind(null, post.id, post.userId);

  return (
    <div className="flex justify-center">
      <UserTextPostShow
      replies={replies}
        post={post}
        deletePost={deletePostAction}
        comments={comments}
      />
    </div>
  );
}
