"use client";

import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";

interface PostListProps {
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const dynamicParams = true;

export default function TextPostList(props: PostListProps) {
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
        <div className="py-4 text-sm lg:text-xl">{post.content}</div>

        <Button
          as={Link} // Make Button act as a Link
          href={`${paths.textPostShow(post.id)}`}
          className="w-48 lg:w-64 bg-white/25"
        >
          View
        </Button>
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
