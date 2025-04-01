"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button, Card } from "@heroui/react";
import { Comment, ImgPost, PostType } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";
import CommentsPost from "@/components/comments/CommentsPostGeneral";
import VoteButton from "@/components/vote/votePost";



interface ImgPostShowProps {
  post: ImgPost;
  comments: Comment[];
  replies: Comment[]
}

export default function ImgPostShow(props: ImgPostShowProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <Card isBlurred className="mt-8 mx-8 lg:w-1/2 lg:px-8  mb-8 flex items-center dark:bg-black/25">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <Zoom>
          <CldImage
            className="rounded-xl mb-4"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={props.post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        </Zoom>

        <p className="mb-8">{props.post.content}</p>
        <div className="flex mb-2">
          <VoteButton postId={props.post.id} postType="IMAGE" />
          <CommentButtonPosts
            commentsLength={props.comments.length}
            onClick={focusTextarea}
          />
        </div>
        <CommentsPost
          postId={props.post.id}
          comments={props.comments}
          replies={props.replies}
          postType={props.post.postType}
          ref={textareaRef}
        />
      </Card>
      <Card isBlurred className="mb-4">
        <Button
        name="Back"
          className="bg-white/25"
          onPress={() => router.back()} // Use router.back() for dynamic navigation
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
