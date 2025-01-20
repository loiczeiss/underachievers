import { db } from "@/db";
import ImgPostShow from "@/components/posts/images/imgPostShow";
import ImageViewer from "@/components/imageViewer";

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ImgPostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = await db.imgPost.findFirst({ where: { id } });
  const comments = await db.comment.findMany({ where: { imgPostId: id } });
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  return (
    <div className="flex justify-center">
      <ImgPostShow post={post} comments={comments} />
      <ImageViewer imgUrl={post.imgUrl} />
    </div>
  );
}
