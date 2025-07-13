import { db } from '@/db';
import ImgPostShow from '@/components/posts/images/imgPostShow';

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ImgPostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = await db.imgPost.findFirst({
    where: { id },
    cacheStrategy: { swr: 60 },
  });
  const replies = await db.comment.findMany({
    where: {
      AND: [
        { imgPostId: id }, // Matches the specific audio post ID
        { parentId: { not: null } }, // Ensures parentId exists (i.e., it's a reply)
      ],
    },
    cacheStrategy: { swr: 60 },
  });
  const comments = await db.comment.findMany({ where: { imgPostId: id } });
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  return (
    <div className="flex justify-center">
      <ImgPostShow post={post} comments={comments} replies={replies} />
    </div>
  );
}
