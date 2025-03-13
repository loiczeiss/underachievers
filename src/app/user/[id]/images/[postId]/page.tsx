import { db } from "@/db";
import * as actions from "@/actions";
import UserImgPostShow from "@/components/posts/user/images/UserImgPostShow";

interface PostShowPageProps {
  params: Promise<{
    postId: string;
    id: string;
  }>;
}

export default async function ImgPostShowPage(props: PostShowPageProps) {
  const params = await props.params;

  const post = await db.imgPost.findFirst({ where: { id: params.postId } });
  const comments = await db.comment.findMany({
    where: { imgPostId: params.postId },
  });
  const replies = await db.comment.findMany({
    where: {
      AND: [
        { imgPostId: params.id }, // Matches the specific audio post ID
        { parentId: { not: null } } // Ensures parentId exists (i.e., it's a reply)
      ]
    }
  });
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }
  const deleteImgPostAction = actions.deleteImgPost.bind(
    null,
    post.id,
    post.userId,
    post.imgPublicId
  );
  return (
    <div className="flex justify-center">
      <UserImgPostShow
      replies={replies}
        post={post}
        deleteImgPost={deleteImgPostAction}
        comments={comments}
      />
    </div>
  );
}
