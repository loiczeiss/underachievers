"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/index.scss";
import { Comment, PostType } from "@prisma/client";
import VoteButton from "@/components/vote/votePost";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";
import { useRef } from "react";
import CommentsPost from "@/components/comments/CommentsPostGeneral";

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

interface AudioPostShowProps {
  replies: Comment[]
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
 const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <Card isBlurred className="mt-8 mx-8 lg:w-1/2 lg:px-8  mb-8 flex items-center ">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        {props.audio ? (
          <AudioPlayer
            header={`${props.audio.displayName}`}
            className="mb-4"
            autoPlay={false}
            src={props.audio.url}
          />
        ) : (
          <p>Loading audio...</p>
        )}
 <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">{props.post.content}</Card>
        <div className="flex mb-2">
          {" "}
          <VoteButton postId={props.post.id} postType="AUDIO" />
          <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea}/>
        </div>
        <CommentsPost postId={props.post.id} comments={props.comments} replies={props.replies}  ref={textareaRef} postType={props.post.postType} />
        <form action={props.deleteAudioPost}>
          <Button
          name="Delete"
            className="w-48 mb-4 bg-red-400"
            type="submit"
          >
            Delete the post
          </Button>
        </form>
      </Card>
      <Card isBlurred className="mb-4">
        <Button
        name="Back"
          className="bg-white/25"
          onPress={() => router.back()} 
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
