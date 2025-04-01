"use client";

import { Button, Card } from "@heroui/react";
import { Comment, ImgPost } from "@prisma/client";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import VoteButton from "@/components/vote/votePost";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";
import CommentsPost from "@/components/comments/CommentsPostGeneral";

interface ImgPostShowProps {
  post: ImgPost;
  deleteImgPost?: (formData: FormData) => void | Promise<void>;
  comments: Comment[];
  replies: Comment[];
}

export default function UserImgPostShow(props: ImgPostShowProps) {
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
      <Card isBlurred className="mt-8 mx-8 lg:w-1/2 lg:px-8  mb-8 flex items-center dark:bg-black/25 dark:text-zinc-300">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <Zoom>
          <CldImage
            className="rounded-xl mb-4 "
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={props.post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        </Zoom>
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base dark:bg-black/25 dark:text-zinc-300">
          {props.post.content}
        </Card>
        <div className="flex mb-2">
          {" "}
          <VoteButton postId={props.post.id} postType="AUDIO" />
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
        <form action={props.deleteImgPost}>
          <Button id="Delete" className="w-48 mb-4 bg-red-400" type="submit">
            Delete the post
          </Button>
        </form>
      </Card>{" "}
      <Card isBlurred className="my-4">
        {" "}
        <Button
        id="Back"
          className="bg-white/25 dark:bg-black/25 dark:text-zinc-300 dark:hover:bg-black/75"
          onPress={() => router.back()} // Use router.back() for dynamic navigation
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
