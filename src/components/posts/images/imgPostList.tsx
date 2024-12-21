"use client"

import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface ImgPostListprops {
    posts: {
        title:string;
        content: string;
        id: string;
        userId: string;
        imgUrl: string;
        createdAt: Date;
        updatedAt: Date
    }[]
}

export const dynamicParams= true;

export default function ImgPostList(props: ImgPostListprops){
    const renderedImgPosts = [...props.posts].reverse().map((post)=> {
        return (
          <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8" key={post.id}>
            <div className="uppercase lg:text-2xl"> {post.title}</div>
       
            <CldImage
                className="rounded-xl mb-4 "
                width={300} // Adjust width as needed
                height={200} // Adjust height as needed
                src={post.imgUrl}
                sizes="100vw"
                alt="Uploaded Image"
              />
                   <div className="py-4 text-sm lg:text-xl">{post.content}</div>
            <Button className="w-48 lg:w-64 bg-white/25">
              <Link
                href={`${paths.imgPostShow(post.id)}`}
              >
                View
              </Link>
            </Button>
          </Card>
        );
      })
      return (
        <>
          <div className="self-center lg:w-4/6 flex flex-col my-4 overscroll-contain">
            {renderedImgPosts}
          </div>
        </>
      );
}