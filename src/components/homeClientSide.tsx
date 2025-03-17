"use client";

import AllPostList from "./posts/all/AllPostsList";
import NavLinks from "./navLinks";
import {
  Audio,
  AudioPost,
  Comment,
  ImgPost,
  PostType,
  TextPost,
} from "@prisma/client";
import { Suspense } from "react";
import Loading from "@/app/loading";


interface AllPostListprops {
  audios: Audio[];
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    postType: PostType;
  }[];
  textPosts: TextPost[];
  imgPosts: ImgPost[];
  audioPosts: AudioPost[];
  comments: Comment[];
}
export default function HomeClientSide(props: AllPostListprops) {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full ">
        <NavLinks />

        <Suspense fallback={<p>Loading feed...</p>} ><AllPostList
          posts={props.allPosts}
          audios={props.audios}
          comments={props.comments}
        /></Suspense>
      </div>
    </>
  );
}
