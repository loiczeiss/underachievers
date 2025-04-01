"use client";

import { Button, Card } from "@heroui/react";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { Comment, PostType } from "@prisma/client";
import CommentButtonPosts from "@/components/comments/CommentButtonPost";
import VoteButton from "@/components/vote/votePost";
import { useRef } from "react";
import CommentsPost from "@/components/comments/CommentsPostGeneral";

interface Post {
  title: string;
  content: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  postType: PostType
}

interface PostShowProps {
  replies: Comment[]
  comments: Comment[];
  post: Post;
  deletePost?: (formData: FormData) => void | Promise<void>;
}

export default function UserTextPostShow(props: PostShowProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
    const focusTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Card isBlurred className="mt-8 mx-8 lg:w-1/2 lg:px-8  mb-8 flex items-center dark:text-zinc-300 dark:bg-black/25">
          <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
          <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base dark:text-zinc-300 dark:bg-black/25">{props.post.content}</Card>
             <div className="flex mb-2">
                    {" "}
                    <VoteButton postId={props.post.id} postType="TEXT" />
                    <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea} />
                  </div>
                  <CommentsPost  postId={props.post.id} comments={props.comments} replies={props.replies}  ref={textareaRef} postType={props.post.postType}  />
          <form action={props.deletePost}>
            <Button
            name="Delete"
              className="w-48 mb-4 bg-red-400"
              type="submit"
            >
              Delete the post
            </Button>
          </form>
        </Card>{" "}
        <Card isBlurred className="mb-4">
          {" "}
          <Button
          name="Back"
            className="bg-transparent dark:text-zinc-300 dark:bg-black/25 dark:hover:bg-black/75"
            onPress={() => redirect(paths.userPostsPage(props.post.userId))}
          >
            Back
          </Button>
        </Card>
      </div>
    </>
  );
}
