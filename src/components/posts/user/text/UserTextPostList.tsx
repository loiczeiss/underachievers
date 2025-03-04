"use client";

import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";
import { Comment } from "@prisma/client";
import CommentButton from "@/components/comments/CommentButtonLists";
import VoteTextButton from "@/components/vote/VoteText";

interface PostListProps {
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  comments: Comment[]
}

export const dynamicParams = true;

export default function UserTextPostList(props: PostListProps) {
  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8">
      <p>No posts yet.</p>
    </Card>
  );

  const renderedPosts = [...props.posts].reverse().map((post) => {
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            <VoteTextButton postId={post.id} />

            <CommentButton commentsLength={props.comments.length} />
          </div>
          <div>
            {" "}
            <Button
          as={Link} // Use Link as the underlying component
          href={`${paths.userTextPostPage(post.userId, post.id)}`}
          className="w-48 lg:w-64 bg-white/25"
        >
          View
        </Button>
          </div>
        </div>

       
      </Card>
    );
  });
  return (
    <>
      <div className="self-center lg:w-4/6 flex flex-col my-4 overscroll-contain">
        {props.posts.length === 0 ? noPostYet : renderedPosts}
      </div>
    </>
  );
}
