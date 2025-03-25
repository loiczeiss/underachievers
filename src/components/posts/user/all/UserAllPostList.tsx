"use client";

import paths from "@/paths";
import { Card, Button } from "@heroui/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import { useState, useEffect } from "react";
import { Comment, PostType } from "@prisma/client";
import CommentButton from "@/components/comments/CommentButtonLists";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import VoteButton from "@/components/vote/votePost";

interface AllPostListprops {
  mediaTypeFilter: number;
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    audioId?: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    postType: PostType;
  }[]; // Correctly define `posts` as an array of objects
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
export const dynamicParams = true;

export default function UserAllPostList(props: AllPostListprops) {
  const [audioMap, setAudioMap] = useState<{ [key: string]: AudioData | null }>(
    {}
  );

  useEffect(() => {
    const audioDataMap = props.audios.reduce((acc, audio) => {
      acc[audio.id] = audio;
      return acc;
    }, {} as { [key: string]: AudioData });

    setAudioMap(audioDataMap);
  }, [props.audios]);

  console.log(props.posts);
  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:text-zinc-300 dark:bg-black/25">
      <p>No posts yet.</p>
    </Card>
  );
  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    const audio = post.audioId ? audioMap[post.audioId] : null; // Get associated audio for the post
    const postComments = props.comments.filter((comment) => {
      if (post.postType === "TEXT") return comment.textPostId === post.id;
      if (post.postType === "IMAGE") return comment.imgPostId === post.id;
      if (post.postType === "AUDIO") return comment.audioPostId === post.id;
      return false;
    });
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:text-zinc-300 dark:bg-black/25"
        // key={Number(post.id)}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        <p>{post.id}</p>
        {post.imgUrl && (
          <Zoom>
            <CldImage
              className="rounded-xl mb-0 mt-4"
              width={300} // Adjust width as needed
              height={200} // Adjust height as needed
              src={post.imgUrl}
              sizes="100vw"
              alt="Uploaded Image"
            />
          </Zoom>
        )}
        {audio && (
          <AudioPlayer
            header={`${audio.displayName}`}
            className="mb-4 dark:invert"
            autoPlay={false}
            src={audio.url}
          />
        )}
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base dark:text-zinc-300 dark:bg-black/25" >
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            {" "}
            <VoteButton postId={post.id} postType={post.postType} />
            <CommentButton
              postId={post.id}
              postType={post.postType}
              post={post}
              commentsLength={postComments.length}
            />
          </div>
          <Button
            as={Link}
            href={
              post.imgUrl
                ? paths.userImgPostPage(post.userId, post.id)
                : post.audioId
                ? paths.userAudioPostPage(post.userId, post.id)
                : paths.userTextPostPage(post.userId, post.id)
            }
            className="w-12 lg:w-48 lg:w-64 bg-white/25 dark:text-zinc-300 dark:bg-black/25"
          >
            View
          </Button>
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
