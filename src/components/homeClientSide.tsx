"use client";

import { useState } from "react";

import AllPostList from "./posts/all/AllPostsList";

import NavLinks from "./navLinks";
import { Audio, AudioPost, Comment, ImgPost, TextPost, Vote } from "@prisma/client";

interface AllPostListprops {
  audios: Audio[]
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    type: string
  }[];
  textPosts: TextPost[];
  imgPosts:ImgPost[];
  audioPosts:AudioPost[]
  comments: Comment[];
  votes: Vote[]
}
export default function HomeClientSide(props: AllPostListprops) {

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full">
        <NavLinks  />

          <AllPostList
            posts={props.allPosts}
            audios={props.audios}

            comments={props.comments}

          />


      </div>
    </>
  );
}
