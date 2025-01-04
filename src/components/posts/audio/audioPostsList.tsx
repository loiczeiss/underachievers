"use client";

import { useEffect, useState } from "react";
import paths from "@/paths";
import { Card, Button } from "@nextui-org/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import Link from "next/link";

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
}

interface AudioPostListProps {
  posts: AudioPost[];
  audios: AudioData[];
}

export const dynamicParams = true;

export default function AudioPostList(props: AudioPostListProps) {
  const [audioMap, setAudioMap] = useState<{ [key: string]: AudioData | null }>({});

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

  const renderedAudioPosts = [...props.posts].reverse().map((post) => {
    const audio = audioMap[post.audioId]; // Find the audio associated with the post

    return (
      <Card
        isBlurred
        className="mx-8 mb-4 lg:mr-8 py-4 px-2 sm:px-8"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>

        {audio ? (
          <AudioPlayer
            header={`${audio.displayName}`}
            className="mt-4  mb-4"
            autoPlay={false}
            src={audio.url}
   
          />
        ) : (
          <p>Loading audio...</p>
        )}

        <div className="py-4 text-sm lg:text-xl">{post.content}</div>
        <Button
          as={Link}
          href={`${paths.audioPostShowPage(post.id)}`}
          className="w-48 lg:w-64 bg-white/25"
        >
          View
        </Button>
      </Card>
    );
  });

  return (
    <div className="self-center lg:w-4/6 flex flex-col my-4 overscroll-contain">
      {props.posts.length === 0 ? noPostYet : renderedAudioPosts}
    </div>
  );
}
