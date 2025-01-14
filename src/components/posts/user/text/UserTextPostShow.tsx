"use client";

import { Button, Card } from "@nextui-org/react";
import paths from "@/paths";
import { redirect } from "next/navigation";
import VoteTextButton from "@/components/vote/VoteText";
import { Comment } from "@prisma/client";
import CommentButton from "@/components/comments/CommentButton";
import CommentsTextPost from "@/components/comments/CommentsTextPost";

interface Post {
  title: string;
  content: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostShowProps {
  comments: Comment[];
  post: Post;
  deletePost?: (formData: FormData) => void | Promise<void>;
}

export default function UserTextPostShow(props: PostShowProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Card isBlurred className="mt-8 w-1/2 px-8">
          <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
          <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">{props.post.content}</Card>
             <div className="flex mb-2">
                    {" "}
                    <VoteTextButton postId={props.post.id} />
                    <CommentButton commentsLength={props.comments.length} />
                  </div>
                  <CommentsTextPost postId={props.post.id} comments={props.comments} />
          <form action={props.deletePost}>
            <Button
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
            className="bg-transparent"
            onPress={() => redirect(paths.userPostsPage(props.post.userId))}
          >
            Back
          </Button>
        </Card>
      </div>
    </>
  );
}
