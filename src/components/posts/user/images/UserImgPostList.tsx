"use client";

import CommentButton from "@/components/comments/CommentButtonLists";
import VoteImgButton from "@/components/vote/VoteImg";
import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import { Comment } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ImgPostListprops {
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  comments: Comment[];
}

export const dynamicParams = true;

export default function UserImgPostList(props: ImgPostListprops) {
  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8">
      <p>No posts yet.</p>
    </Card>
  );
  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        <Zoom>
          <CldImage
            className="rounded-xl mt-4 "
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        </Zoom>
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            <VoteImgButton postId={post.id} />

            <CommentButton commentsLength={props.comments.length} />
          </div>
          <div>
            {" "}
            <Button
              as={Link} // Use Link as the underlying component
              href={`${paths.userImgPostPage(post.userId, post.id)}`}
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
        {props.posts.length === 0 ? noPostYet : renderedImgPosts}
      </div>
    </>
  );
}
