"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import { db } from "@/db";
import CommentsAudioPost from "@/components/comments/CommentsAudioPost";
import { PostType } from "@prisma/client";

interface AudioPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  audioId: string;
   comments: {
      id: string;
      content: string;
      textPostId: string | null;
      postType: PostType;
      userName: string;
      userImage: string;
      userId: string;
      imgPostId: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[];
}



interface AudioPostShowProps {
  post: AudioPost;
  audio: AudioData
  comments: Comment
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

export default function AudioPostShow({ post, audio, comments }: AudioPostShowProps) {
  const router = useRouter();



  return (
    <div className="w-full flex flex-col items-center">
      <Card isBlurred className="mt-8 w-1/2 px-8 mb-8">
        <h1 className="my-4 text-xl uppercase">{post.title}</h1>
        {/* Conditionally render the Player only when audio data is loaded */}
        {audio ? (
          <AudioPlayer
            header={`${audio.displayName}`}
            className="mb-4"
            autoPlay={false}
            src={audio.url}
            onPlay={(e) => console.log("onPlay")}
          />
        ) : (
          <p>Loading audio...</p>
        )}
        <p className="mb-8">{post.content}</p>
        {/* Uncomment when ready */}
        <CommentsAudioPost postId={post.id} comments={comments} />
      </Card>
      <Card isBlurred className="mb-4">
        <Button
          className="bg-white/25"
          onPress={() => router.back()} // Use router.back() for dynamic navigation
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
