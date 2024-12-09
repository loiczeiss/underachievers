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

export const dynamicParams = true

export default function PostList(props: PostListProps) {

  const renderedPosts = props.posts.map((post) => {
    return (
      <Card isBlurred className="w-full mb-4 mr-8 py-4 px-8" key={post.id}>
        <div className="uppercase text-2xl"> {post.title}</div>
        <div className="py-4">{post.content}</div>

        <Button className="w-64 bg-white/25">
          <Link
            href={`${paths.postShow(post.id)}`}
          >
            View
          </Link>
        </Button>
      </Card>
    );
  });
  return (
    <>
      <div className="w-4/6 flex flex-col my-4 overscroll-contain">
        {renderedPosts}
      </div>
    </>
  );
}
