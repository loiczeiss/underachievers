"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import CommentsAudioPost from "@/components/comments/CommentsAudioPost";
import { Comment } from "@prisma/client";
import VoteAudioButton from "@/components/vote/voteAudio";
import CommentButton from "@/components/comments/CommentButton";

interface AudioPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  audioId: string;
}

interface AudioPostShowProps {
  post: AudioPost;
  audio: AudioData | null;
  comments: Comment[];
  deleteAudioPost?: (formData: FormData) => void | Promise<void>;
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

export default function AudioPostShow(props: AudioPostShowProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      <Card isBlurred className="mt-8 w-1/2 px-8 mb-8">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        {props.audio ? (
          <AudioPlayer
            header={`${props.audio.displayName}`}
            className="mb-4"
            autoPlay={false}
            src={props.audio.url}
            onPlay={(e) => console.log("onPlay")}
          />
        ) : (
          <p>Loading audio...</p>
        )}
 <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">{props.post.content}</Card>
        <div className="flex mb-2">
          {" "}
          <VoteAudioButton postId={props.post.id} />
          <CommentButton commentsLength={props.comments.length} />
        </div>
        <CommentsAudioPost postId={props.post.id} comments={props.comments} />
        <form action={props.deleteAudioPost}>
          <Button
            className="w-48 mb-4 bg-red-400"
            type="submit"
          >
            Delete the post
          </Button>
        </form>
      </Card>
      <Card isBlurred className="mb-4">
        <Button
          className="bg-white/25"
          onPress={() => router.back()} 
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
