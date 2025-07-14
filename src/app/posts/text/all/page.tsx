import NavBar from '@/components/navLinks';
import PostList from '@/components/posts/text/PostTextList';
import { db } from '@/db';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';
export const metadata: Metadata = generateMeta({
  title: 'Writings | UnderAchievers',
});

export default async function PostsListPage() {
  const posts = await db.textPost.findMany();
  const comments = await db.comment.findMany({
    where: { textPostId: { not: null } },
    cacheStrategy: { swr: 60 },
  });

  // Add postType to each post manually
  const postsWithType = posts.map((post) => ({
    ...post,
    type: 'TEXT',
  }));
  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        <NavBar />
        <PostList posts={postsWithType} comments={comments} />
      </div>
    </>
  );
}
