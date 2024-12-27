import { db } from "@/db";
import * as actions from "@/actions";
import UserImgPostShow from "@/components/posts/user/images/UserImgPostShow";

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ImgPostShowPage(props: PostShowPageProps) {
  const params = await props.params;

  const { id } = params.id;

  const post = await db.imgPost.findFirst({ where: { id } });

  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }
  const deleteImgPostAction = actions.deleteImgPost.bind(null, post.id, post.userId);
  return (
    <div className="flex justify-center">
      <UserImgPostShow post={post} deleteImgPost={deleteImgPostAction} />
    </div>
  );
}
