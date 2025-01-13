"use client";
import { Avatar, Button, Card, Form, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { PostType } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import paths from "@/paths";
interface CommentProps {
  postId: string;
  comments: {
    id: string;
    userName: string;
    userImage: string;
    content: string;
    textPostId: string | null;
    postType: PostType;
    userId: string;
    imgPostId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  deleteCommentTextPost?: (commentId: string, imgPostId: string) => void;
}
export default function CommentsImgPost(props: CommentProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter(); // Next.js router for client-side navigatio
  const [commentContentValue, setCommentContentValue] = useState("");
  const [formState, action] = useFormState(actions.createCommentImgAction, {
    errors: {},
  });

  dayjs.extend(relativeTime);

  const handleDeleteComment = async (commentId: string, imgPostId: string) => {
    try {
      await actions.deleteCommentImgPost(commentId, imgPostId); // Calling the server action directly
      alert("Comment deleted successfully!");
      setIsDeleted(true);
      // Optionally, update the UI or refresh the comments
    } catch (error) {
      alert("Failed to delete comment.");
    }
  };
  console.log(props.postId);
  useEffect(() => {
    if (isDeleted) {
      // Redirect after the deletion
      router.push(`${paths.imgPostShow(props.postId)}`);
    }
  }, [isDeleted, router, props.postId]);
  const session = useSession();

  const NoCommentsYet = (
    <Card isBlurred className="bg-white/25 p-4 mt-2">
      <p>No Comments Yet</p>
    </Card>
  );

  const renderedComments = [...props.comments].reverse().map((comment) => {
    return (
      <Card isBlurred className="bg-white/25 p-4 mt-2" key={comment.id}>
        <div className="flex items-center">
          <Avatar src={comment.userImage || ""} className=" w-8 h-8 mr-4" />
          <p className="text-gray-800">{comment.userName}</p>
          <p className="text-xs  text-gray-700 ml-4">
            {dayjs().to(dayjs(comment.createdAt))}
          </p>
        </div>
        <p className="ml-12 break-words text-gray-800	">{comment.content}</p>
        <Button
          onPress={(e) =>
            handleDeleteComment(comment.id, comment.imgPostId as string)
          }
          className={`${
            session.data?.user?.id === comment.userId ? "block" : "hidden"
          } w-48 rounded-xl bg-red-400 self-end mt-2`}
        >
          Delete comment
        </Button>
      </Card>
    );
  });

  return (
    <>
      <div className="mb-4">
        <Card isBlurred className="bg-white/25 ">
          <Form
            action={action}
            className="flex flex-col"
            validationBehavior="native"
          >
            <Textarea
              // isInvalid={!!formState.errors.content}
              // errorMessage={formState.errors.content?.join(", ")}

              validate={(commentContentValue) => {
                if (commentContentValue.length < 3) {
                  return formState.errors.content?.join(", ");
                }
              }}
              value={commentContentValue}
              onValueChange={setCommentContentValue}
              variant="bordered"
              isClearable
              classNames={{
                input: "placeholder:text-gray-600",
                inputWrapper: [
                  "border-none",
                  "hover:border-black",
                  "focus-within:!border-white/50",
                ],
                errorMessage: ["bg-white/25", "rounded-lg", "p-4"],
                base: "border-gray-800",
              }}
              name="content"
              placeholder="Add a comment"
            />
            <input type="hidden" name="imgPostId" value={props.postId} />{" "}
            <input type="hidden" name="postType" value={"IMAGE"} />
            <Button type="submit" className="w-42 bg-white/50 self-end m-4">
              Comment
            </Button>
          </Form>
        </Card>
        {renderedComments.length === 0 ? NoCommentsYet : renderedComments}
      </div>
    </>
  );
}
