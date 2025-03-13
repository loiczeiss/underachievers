"use client";

import CommentButton from "@/components/comments/CommentButtonLists";
import VoteButton from "@/components/vote/votePost";
import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import { Comment, PostType } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ImgPostListprops {
  comments: Comment[];
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postType: PostType
  }[];
}

export const dynamicParams = true;

export default function ImgPostList(props: ImgPostListprops) {
  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8">
      <p>No posts yet.</p>
    </Card>
  );
  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    return (
      <Card
        isBlurred
        className="lg:mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        <Zoom>
          <CldImage
            className="rounded-xl mb-4 "
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
            {" "}
            <VoteButton postId={post.id} postType={post.postType} />
            <CommentButton commentsLength={props.comments.length} post={post} postType={post.postType}  postId={post.id}/>
          </div>
          <div>
            <Button
              as={Link} // Use Link as the underlying component for the Button
              href={`${paths.imgPostShow(post.id)}`}
              className="w-12 md:w-48 lg:w-64 bg-white/25"
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
      <div className="self-center w-5/6 lg:w-4/6 flex flex-col my-4 overscroll-contain">
        {props.posts.length === 0 ? noPostYet : renderedImgPosts}
      </div>
    </>
  );
}
