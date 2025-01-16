"use client";

import { useState } from "react";


import TextPostList from "./posts/text/PostTextList";
import ImgPostList from "./posts/images/imgPostList";

import NavFilters from "./navFilters";
import UserAllPostList from "./posts/user/all/UserAllPostList";
import UserImgPostList from "./posts/user/images/UserImgPostList";
import UserTextPostList from "./posts/user/text/UserTextPostList";
import { Card } from "@nextui-org/react";
import { AudioPost, ImgPost, TextPost } from "@prisma/client";
interface ImgPostListprops {
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    audioUrl?: string
    createdAt: Date;
    updatedAt: Date;
  }[];
  textPosts: TextPost[];
  imgPosts:ImgPost[];
  audioPosts: AudioPost[]
  audios: AudioData[]
}
interface AudioData {
  id: string;
  publicId: string;
  url: string;
  displayName: string;
  playbackUrl: string;
  thumbnailUrl: string;
  duration: number;
  format: string;
  createdAt: Date;
}

export default function UserClientSide(props: ImgPostListprops) {
  const [mediaTypeFilter, setMediaTypeFIlter] = useState(0);
  return (
    <>
    <Card isBlurred className="w-10/12 mx-8 text-center py-4 mt-4 text-2xl">My posts</Card>
      <div className="flex flex-col lg:flex-row w-full">
        <NavFilters setMediaTypeFilter={setMediaTypeFIlter} />
        {mediaTypeFilter === 0 && (
          <UserAllPostList
            posts={props.allPosts}
            audios={props.audios}
            mediaTypeFilter={mediaTypeFilter}
          />
        )}
        {mediaTypeFilter === 1 && <UserImgPostList posts={props.imgPosts} />}
        {mediaTypeFilter === 2 && <UserTextPostList posts={props.textPosts} />}
      </div>
    </>
  );
}
