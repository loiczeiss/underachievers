'use client';

import { Button, Card } from '@heroui/react';
import Link from 'next/link';
import paths from '@/paths';
import { Comment, PostType } from '@prisma/client';
import CommentButton from '@/components/comments/CommentButtonLists';
import VoteButton from '@/components/vote/votePost';

interface PostListProps {
  comments: Comment[];
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    postType: PostType;
  }[];
}

export const dynamicParams = true;

export default function TextPostList(props: PostListProps) {
  const noPostYet = (
    <Card
      isBlurred
      className="mx-8 mb-4 px-2 py-4 sm:px-8 lg:mr-8 dark:bg-black/25 dark:text-zinc-300"
    >
      <p>No posts yet.</p>
    </Card>
  );

  const renderedPosts = [...props.posts].reverse().map((post) => {
    // Filter comments for the current post
    const postComments = props.comments.filter((comment) => comment.textPostId === post.id);

    return (
      <Card
        isBlurred
        className="mb-4 px-2 py-4 sm:px-8 lg:mx-8 dark:bg-black/25 dark:text-zinc-300"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>
        <Card
          isBlurred
          className="mb-4 mt-2 p-2 text-sm lg:text-base dark:bg-black/25 dark:text-zinc-300"
        >
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            <VoteButton postId={post.id} postType={post.postType} />
            <CommentButton
              commentsLength={postComments.length}
              post={post}
              postType={post.postType}
              postId={post.id}
            />
          </div>
          <div>
            <Button
              id="View"
              as={Link}
              href={`${paths.textPostShow(post.id)}`}
              className="w-12 bg-white/25 md:w-48 lg:w-64 dark:bg-black/25 dark:text-zinc-300"
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div className="my-4 flex w-5/6 flex-col self-center overscroll-contain lg:w-4/6">
      {props.posts.length === 0 ? noPostYet : renderedPosts}
    </div>
  );
}
