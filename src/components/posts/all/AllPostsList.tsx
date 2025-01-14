"use client";

import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import { useState, useEffect } from "react";
import { Comment, Vote } from "@prisma/client";
import VoteAudioButton from "@/components/vote/voteAudio";
import VoteImgButton from "@/components/vote/VoteImg";
import VoteTextButton from "@/components/vote/VoteText";
import CommentButton from "@/components/comments/CommentButton";

interface AudioData {
  id: string;
  url: string;
  displayName: string;
}

interface AllPostListprops {
  audios: AudioData[];
  mediaTypeFilter: number;
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    audioId?: string; // Optional, since not all posts have `audioId`
    imgUrl?: string; // Optional for non-image posts
    createdAt: Date;
    updatedAt: Date;
    type: string;
  }[];
  comments: Comment[];
  votes: Vote[];
}

export const dynamicParams = true;

export default function AllPostList(props: AllPostListprops) {
  const [audioMap, setAudioMap] = useState<{ [key: string]: AudioData | null }>(
    {}
  );

  // Associate audios with posts on initial render
  useEffect(() => {
    const audioDataMap = props.audios.reduce((acc, audio) => {
      acc[audio.id] = audio;
      return acc;
    }, {} as { [key: string]: AudioData });

    setAudioMap(audioDataMap);
  }, [props.audios]);

  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8">
      <p>No posts yet.</p>
    </Card>
  );

  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    const audio = post.audioId ? audioMap[post.audioId] : null; // Get associated audio for the post
    const postComments = props.comments.filter((comment) => {
      if (post.type === "TEXT") return comment.textPostId === post.id;
      if (post.type === "IMAGE") return comment.imgPostId === post.id;
      if (post.type === "AUDIO") return comment.audioPostId === post.id;
      return false;
    });

    const handleRedirect = (post: (typeof props.posts)[number]) => {
      if (post.imgUrl) {
        return paths.imgPostShow(post.id);
      } else if (post.audioId) {
        return paths.audioPostShowPage(post.id);
      } else {
        return paths.textPostShow(post.id);
      }
    };
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>
        {audio ? (
          <AudioPlayer
            header={audio.displayName}
            className="mt-4 mb-2"
            autoPlay={false}
            src={audio.url}
          />
        ) : post.audioId ? (
          <p>Loading audio...</p>
        ) : null}
        {post.imgUrl && (
          <CldImage
            className="rounded-xl mb-0 mt-4"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        )}
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            {" "}
            {post.audioId ? (
              <VoteAudioButton postId={post.id} />
            ) : post.imgUrl ? (
              <VoteImgButton postId={post.id} />
            ) : (
              <VoteTextButton postId={post.id} />
            )}
            <CommentButton commentsLength={postComments.length} />
          </div>

          <div className="">
            {" "}
            <Button
              as={Link} // Pass the Link component directly to the Button
              className="w-48 lg:w-64 bg-white/25"
              href={handleRedirect(post)}
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div className="self-center lg:w-4/6 flex flex-col my-4 overscroll-contain">
      {props.posts.length === 0 ? noPostYet : renderedImgPosts}
    </div>
  );
}
