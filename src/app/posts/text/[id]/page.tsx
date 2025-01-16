import PostShow from "@/components/posts/text/PostTextShow";
import { db } from "@/db";

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = await db.textPost.findFirst({ where: { id } });
  const comments = await db.comment.findMany({ where: { textPostId: id } });

  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  return (
    <div className="flex justify-center">
      <PostShow post={post} comments={comments} />
    </div>
  );
}
