"use client";

import { useState } from "react";

import AllPostList from "./posts/all/AllPostsList";
import TextPostList from "./posts/text/PostTextList";
import ImgPostList from "./posts/images/imgPostList";
import NavLinks from "./navLinks";
import { Audio, AudioPost, Comment, ImgPost, TextPost, Vote } from "@prisma/client";
import AudioPostList from "./posts/audio/audioPostsList";
interface ImgPostListprops {
  audios: Audio[]
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  textPosts: TextPost[];
  imgPosts:ImgPost[];
  audioPosts:AudioPost[]
  comments: Comment[];
  votes: Vote[]
}
export default function HomeClientSide(props: ImgPostListprops) {
  const [mediaTypeFilter, setMediaTypeFIlter] = useState(0);
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full">
        <NavLinks setMediaTypeFilter={setMediaTypeFIlter} />
        {mediaTypeFilter === 0 && (
          <AllPostList
            posts={props.allPosts}
            audios={props.audios}
            mediaTypeFilter={mediaTypeFilter}
            comments={props.comments}
            votes={props.votes}
          />
        )}
        {mediaTypeFilter === 1 && <ImgPostList posts={props.imgPosts} />}
        {mediaTypeFilter === 2 && <TextPostList posts={props.textPosts} />}
        {mediaTypeFilter === 3 && <AudioPostList posts={props.audioPosts} audios={props.audios}/>}
      </div>
    </>
  );
}
