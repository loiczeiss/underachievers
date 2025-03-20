"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";
import paths from "@/paths";
import { Comment, PostType } from "@prisma/client";
import CommentButton from "@/components/comments/CommentButtonLists";
import VoteButton from "@/components/vote/votePost";

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
  console.log(props.comments);

  const noPostYet = (
    <Card
      isBlurred
      className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:bg-black/25 dark:text-zinc-300"
    >
      <p>No posts yet.</p>
    </Card>
  );

  const renderedPosts = [...props.posts].reverse().map((post) => {
    // Filter comments for the current post
    const postComments = props.comments.filter(
      (comment) => comment.textPostId === post.id
    );

    return (
      <Card
        isBlurred
        className="lg:mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:bg-black/25 dark:text-zinc-300"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>
        <Card
          isBlurred
          className="mt-2 mb-4 p-2 text-sm lg:text-base dark:bg-black/25 dark:text-zinc-300"
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
              as={Link}
              href={`${paths.textPostShow(post.id)}`}
              className="w-12 md:w-48 lg:w-64 bg-white/25 dark:bg-black/25 dark:text-zinc-300"
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div className="self-center w-5/6 lg:w-4/6 flex flex-col my-4 overscroll-contain">
      {props.posts.length === 0 ? noPostYet : renderedPosts}
    </div>
  );
}
