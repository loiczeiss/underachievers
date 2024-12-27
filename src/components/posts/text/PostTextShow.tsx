"use client";

import { Button, Card } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import Comments from "@/components/comments/Comments";

interface Post {
  title: string;
  content: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostShowProps {
  post: Post;
}

export default function TextPostShow({ post }: PostShowProps) {
  return (
    <Card isBlurred className="mt-8 w-1/2 px-8">
      <h1 className="my-4 text-xl uppercase">{post.title}</h1>
      <p className="mb-8">{post.content}</p>
      <Comments/>
    </Card>
  );
}
