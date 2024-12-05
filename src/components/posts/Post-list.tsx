'use client'

import { Card } from "@nextui-org/react";
import Link from "next/link";

interface PostListProps {
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
}
export default function PostList(props: PostListProps) {
    const renderedPosts = props.posts.map((post) => {
            return (
    <Card isBlurred className="w-full mr-8">
    {" "}
    <Link
      key={post.id}
      href={`/posts/${post.id}`}
      className="flex flex-col justify-between items-center p-2 border rounded"
    >
      <div> {post.title}</div>
      <div>{post.content}</div>
      <div>View</div>
    </Link>
  </Card>)})
  return (
    <>
     <div className="w-full flex my-4">{renderedPosts}</div>
    </>
  );
}
