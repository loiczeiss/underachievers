'use client';

import { useState } from 'react';
import NavFilters from './navFilters';
import UserAllPostList from './posts/user/all/UserAllPostList';
import UserImgPostList from './posts/user/images/UserImgPostList';
import UserTextPostList from './posts/user/text/UserTextPostList';
import { Card } from '@heroui/react';
import { AudioPost, Comment, ImgPost, PostType, TextPost } from '@prisma/client';
import UserAudioPostList from './posts/user/audio/UserAudioPostsList';
interface AllPostListprops {
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    audioUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    postType: PostType;
  }[];
  textPosts: TextPost[];
  imgPosts: ImgPost[];
  audioPosts: AudioPost[];
  audios: AudioData[];
  comments: Comment[];
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

export default function UserClientSide(props: AllPostListprops) {
  const [mediaTypeFilter, setMediaTypeFIlter] = useState(0);
  return (
    <>
      <Card
        isBlurred
        className="mx-8 mt-4 w-10/12 py-4 text-center text-2xl dark:bg-black/25 dark:text-zinc-300"
      >
        My posts
      </Card>
      <div className="flex w-full flex-col lg:flex-row">
        <NavFilters setMediaTypeFilter={setMediaTypeFIlter} />
        {mediaTypeFilter === 0 && (
          <UserAllPostList
            posts={props.allPosts}
            audios={props.audios}
            mediaTypeFilter={mediaTypeFilter}
            comments={props.comments}
          />
        )}
        {mediaTypeFilter === 1 && (
          <UserImgPostList posts={props.imgPosts} comments={props.comments} />
        )}
        {mediaTypeFilter === 2 && (
          <UserTextPostList posts={props.textPosts} comments={props.comments} />
        )}
        {mediaTypeFilter === 3 && (
          <UserAudioPostList
            posts={props.audioPosts}
            audios={props.audios}
            comments={props.comments}
          />
        )}
      </div>
    </>
  );
}
