"use client";

import { Button, Card } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { redirect } from "next/navigation";

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

export default function UserTextPostShow({ post, deletePost }: PostShowProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        {" "}
        <p>{post.id}</p>
        <Card isBlurred className="mt-8 w-1/2 px-8">
          <h1 className="my-4 text-xl uppercase">{post.title}</h1>
          <p className="mb-8">{post.content}</p>
          <form action={deletePost}>
            <Button
              className="w-48 mb-4 border-white/25"
              variant="bordered"
              type="submit"
            >
              Delete the post
            </Button>
          </form>
        </Card>{" "}
        <Card isBlurred className="mb-4">
          {" "}
          <Button
            className="bg-transparent"
            onPress={() => redirect(paths.userPostsPage(post.userId))}
          >
            Back
          </Button>
        </Card>
      </div>
    </>
  );
}
