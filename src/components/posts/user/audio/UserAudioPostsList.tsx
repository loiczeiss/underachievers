"use client";

import { useEffect, useState } from "react";
import paths from "@/paths";
import { Card, Button } from "@heroui/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import Link from "next/link";
import { Comment, PostType } from "@prisma/client";
import CommentButton from "@/components/comments/CommentButtonLists";
import VoteButton from "@/components/vote/votePost";

interface AudioData {
  id: string;
  url: string;
  displayName: string;
}

interface AudioPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  audioId: string;
  postType: PostType
}

interface AudioPostListProps {
  posts: AudioPost[];
  audios: AudioData[];
  comments: Comment[];
}

export const dynamicParams = true;

export default function UserAudioPostList(props: AudioPostListProps) {
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

  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:text-zinc-300 dark:bg-black/25">
      <p>No posts yet.</p>
    </Card>
  );

  const renderedAudioPosts = [...props.posts].reverse().map((post) => {
    const audio = audioMap[post.audioId];

    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8 dark:text-zinc-300 dark:bg-black/25"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>

        {audio ? (
          <AudioPlayer
            header={`${audio.displayName}`}
            className="mt-4  mb-4 dark:invert"
            autoPlay={false}
            src={audio.url}
          />
        ) : (
          <p className="dark:text-zinc-300">Loading audio...</p>
        )}

        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base dark:text-zinc-300 dark:bg-black/25">
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            <VoteButton postId={post.id} postType={post.postType} />
            <CommentButton
              commentsLength={props.comments.length}
              post={post}
              postType={post.postType}
              postId={post.id}
            />
          </div>
          <div>
            {" "}
            <Button
              as={Link}
              href={`${paths.audioPostShowPage(post.id)}`}
              className="lg:w-48 lg:w-64 bg-white/25 dark:text-zinc-300 dark:bg-black/25"
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
      {props.posts.length === 0 ? noPostYet : renderedAudioPosts}
    </div>
  );
}
