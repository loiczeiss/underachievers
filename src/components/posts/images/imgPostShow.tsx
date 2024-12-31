"use client";

import CommentsImgPost from "@/components/comments/CommentsImgPost";
import { Button, Card } from "@nextui-org/react";
import { PostType } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface ImgPost {
  title: string;
  content: string;
  imgUrl: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ImgPostShowProps {
  post: ImgPost;
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

export default function ImgPostShow({ post, comments }: ImgPostShowProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      <Card isBlurred className="mt-8 w-1/2 px-8 mb-8">
        <h1 className="my-4 text-xl uppercase">{post.title}</h1>
        <CldImage
          className="rounded-xl mb-4"
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          src={post.imgUrl}
          sizes="100vw"
          alt="Uploaded Image"
        />
        <p className="mb-8">{post.content}</p>
        <CommentsImgPost postId={post.id} comments={comments} />
      </Card>
      <Card isBlurred className="mb-4">
        <Button
          className="bg-white/25"
          onPress={() => router.back()} // Use router.back() for dynamic navigation
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
