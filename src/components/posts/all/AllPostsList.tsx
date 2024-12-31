"use client";

import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface ImgPostListprops {
  mediaTypeFilter: number;
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }[]; // Correctly define `posts` as an array of objects
}

export const dynamicParams = true;

export default function AllPostList(props: ImgPostListprops) {
  const noPostYet = (
    <Card  isBlurred
    className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8">
      <p>No posts yet.</p>
    </Card>
  );
  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={Number(post.id)}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        {post.imgUrl && (
          <CldImage
            className="rounded-xl mb-4 "
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        )}
        <div className="py-4 text-sm lg:text-xl">{post.content}</div>

        <Button
  as={Link} // Pass the Link component directly to the Button
  className="w-48 lg:w-64 bg-white/25"
  href={post.imgUrl ? paths.imgPostShow(post.id) : paths.textPostShow(post.id)}
>
  View
</Button>

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
