"use client";

import { Button, Card } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import CommentsTextPost from "@/components/comments/CommentsTextPost";
import { PostType } from "@prisma/client";
import { useRouter } from "next/navigation";

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
  comments: {
    id: string;
    content: string;
    textPostId: string | null;
    postType: PostType;
    userName: string;
    userImage: string;
    userId: string;
    imgPostId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export default function TextPostShow({ post, comments }: PostShowProps) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center">
      {" "}
      <Card isBlurred className="my-8 w-6/12 mx-8 px-8">
        <h1 className="my-4 text-xl uppercase">{post.title}</h1>
        <p className="mb-8">{post.content}</p>
        <CommentsTextPost postId={post.id} comments={comments} />
      </Card>{" "}
      <Card isBlurred className="mb-4">
        {" "}
        <Button className="bg-white/25" onPress={() => router.back()}>
          Back
        </Button>
      </Card>
    </div>
  );
}
