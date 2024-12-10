"use client";

import { Button, Card } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import paths from "@/paths";


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
  deletePost?: (formData: FormData) => void | Promise<void>;
}


export default function TextPostShow({ post, deletePost }: PostShowProps) {
  console.log(post.id)
  // revalidatePath(`${paths.postShow(post.id)}`)
  return (
    <Card isBlurred className="mt-8 w-1/2 px-8">
            <div>{post.id}</div>
      <h1 className="my-4 text-xl">{post.title}</h1>
      <p className="mb-8">{post.content}</p>
      <form action={deletePost}>
        <Button className="w-48 mb-4" variant="bordered" type="submit">
          Delete the post
        </Button>
      </form>
    </Card>
  );
}