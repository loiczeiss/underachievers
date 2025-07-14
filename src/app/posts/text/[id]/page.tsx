import PostShow from '@/components/posts/text/PostTextShow';
import { db } from '@/db';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = generateMeta({
  title: 'Writings | UnderAchievers',
});

export default async function PostShowPage(props: PostShowPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = await db.textPost.findFirst({
    where: { id },
    cacheStrategy: { swr: 60 },
  });
  const replies = await db.comment.findMany({
    where: {
      AND: [{ textPostId: id }, { parentId: { not: null } }],
    },
    cacheStrategy: { swr: 60 },
  });
  const comments = await db.comment.findMany({ where: { textPostId: id } });

  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  return (
    <div className="flex justify-center">
      <PostShow post={post} comments={comments} replies={replies} />
    </div>
  );
}
