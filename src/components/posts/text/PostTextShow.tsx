  "use client";

import { Button, Card } from "@heroui/react";
import { Comment,  TextPost } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";
import CommentsPost from "@/components/comments/CommentsPostGeneral";
import VoteButton from "@/components/vote/votePost";

interface PostShowProps {
  post: TextPost;
  comments: Comment[];
  replies: Comment[];
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
      <Card
        isBlurred
        className="mt-8 mx-8 lg:w-1/2 lg:px-8  mb-8 flex items-center dark:bg-black/25 dark:text-zinc-300"
      >
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <p className="mb-8">{props.post.content}</p>
        <div className="flex mb-2">
          <VoteButton postId={props.post.id} postType="TEXT" />
          <CommentButtonPosts
            commentsLength={props.comments.length}
            onClick={focusTextarea}
          />
        </div>
        <CommentsPost
          postId={props.post.id}
          comments={props.comments}
          ref={textareaRef}
          replies={props.replies}
          postType={props.post.postType}
        />
      </Card>{" "}
      <Card isBlurred className="mb-4">
        {" "}
        <Button name="Back" className="bg-white/25" onPress={() => router.back()}>
          Back
        </Button>
      </Card>
    </div>
  );
}
