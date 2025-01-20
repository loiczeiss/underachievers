"use client";

import CommentButton from "@/components/comments/CommentButton";
import CommentsImgPost from "@/components/comments/CommentsTextPost";
import VoteImgButton from "@/components/vote/VoteImg";
import paths from "@/paths";
import { Button, Card } from "@nextui-org/react";
import { Comment, ImgPost } from "@prisma/client";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"
import { CldImage } from "next-cloudinary";
import { redirect } from "next/navigation";

interface ImgPostShowProps {
  post: ImgPost;
  deleteImgPost?: (formData: FormData) => void | Promise<void>;
  comments: Comment[];
}

export default function UserImgPostShow(props: ImgPostShowProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {" "}
      <Card isBlurred className="mt-8 w-1/2 px-8">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <Zoom><CldImage
          className="rounded-xl mb-4 "
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          src={props.post.imgUrl}
          sizes="100vw"
          alt="Uploaded Image"
        /></Zoom>
        <Card isBlurred className="mt-2 mb-4 p-2 text-sm lg:text-base">
          {props.post.content}
        </Card>
        <div className="flex mb-2">
          {" "}
          <VoteImgButton postId={props.post.id} />
          <CommentButton commentsLength={props.comments.length} />
        </div>
        <CommentsImgPost postId={props.post.id} comments={props.comments} />
        <form action={props.deleteImgPost}>
          <Button className="w-48 mb-4 bg-red-400" type="submit">
            Delete the post
          </Button>
        </form>
      </Card>{" "}
      <Card isBlurred className="my-4">
        {" "}
        <Button
          className="bg-white/25"
          onPress={() => redirect(paths.userPostsPage(props.post.userId))}
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
