import { db } from "@/db";
import * as actions from "@/actions";
import UserImgPostShow from "@/components/posts/user/images/UserImgPostShow";

interface PostShowPageProps {
  params: Promise<{
    postId: any; id: string 
}>;
}

export default async function ImgPostShowPage(props: PostShowPageProps) {
  const params = await props.params;



  const post = await db.imgPost.findFirst({ where: { id: params.postId } });
  const comments = await db.comment.findMany({where:{imgPostId: params.postId}})
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }
  const deleteImgPostAction = actions.deleteImgPost.bind(
    null,
    post.id,
    post.userId
  );
  return (
    <div className="flex justify-center">
      <UserImgPostShow post={post} deleteImgPost={deleteImgPostAction} comments={comments} />
    </div>
  );
}
