"use client";

import { Button, Card } from "@nextui-org/react";
import CommentsTextPost from "@/components/comments/CommentsTextPost";
import { PostType } from "@prisma/client";
import { useRouter } from "next/navigation";
import VoteTextButton from "@/components/vote/VoteText";
import { useRef } from "react";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";


interface Post {
  title: string;
  content: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostShowProps {
  post: Post;
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

export default function TextPostShow(props: PostShowProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      {" "}
      <Card isBlurred className="my-8 w-6/12 mx-8 px-8">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <p className="mb-8">{props.post.content}</p>
        <div className="flex mb-2">
          <VoteTextButton postId={props.post.id} />
         <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea}/>
        </div>
        <CommentsTextPost postId={props.post.id} comments={props.comments} ref={textareaRef} />
      </Card>{" "}
      <Card isBlurred className="mb-4">
        {" "}
        <Button className="bg-white/25" onPress={() => router.back()}>
          Back
        </Button>
      </Card>
    </div>
  );
}
