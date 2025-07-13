'use server';
import NavBar from '@/components/navLinks';
import ImgPostList from '@/components/posts/images/imgPostList';

import { db } from '@/db';

export default async function PostsListPage() {
  const posts = await db.imgPost.findMany();
  const comments = await db.comment.findMany({
    where: {
      imgPostId: {
        not: null,
      },
    },
    cacheStrategy: { swr: 60 },
  });

  // Add postType to each post manually
  const postsWithType = posts.map((post) => ({
    ...post,
    type: 'IMAGE',
  }));

  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        <NavBar />
        <ImgPostList posts={postsWithType} comments={comments} />
      </div>
    </>
  );
}
