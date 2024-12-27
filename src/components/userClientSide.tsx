"use client";

import { useState } from "react";

import AllPostList from "./posts/all/AllPostsList";
import TextPostList from "./posts/text/PostTextList";
import ImgPostList from "./posts/images/imgPostList";

import NavFilters from "./navFilters";
interface ImgPostListprops {
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  textPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  imgPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
export default function UserClientSide(props: ImgPostListprops) {
  const [mediaTypeFilter, setMediaTypeFIlter] = useState(0);
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full">
        <NavFilters setMediaTypeFilter={setMediaTypeFIlter} />
        {mediaTypeFilter === 0 && (
          <AllPostList
            posts={props.allPosts}
            mediaTypeFilter={mediaTypeFilter}
          />
        )}
        {mediaTypeFilter === 1 && <ImgPostList posts={props.imgPosts} />}
        {mediaTypeFilter === 2 && <TextPostList posts={props.textPosts} />}
      </div>
    </>
  );
}
