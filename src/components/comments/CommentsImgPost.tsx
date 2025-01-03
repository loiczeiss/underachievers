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

  const CommentIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
  }) => {
    return (
      <svg
        width="800px"
        height="800px"
        viewBox="0 -0.5 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.0001 8.517C8.58589 8.517 8.2501 8.85279 8.2501 9.267C8.2501 9.68121 8.58589 10.017 9.0001 10.017V8.517ZM16.0001 10.017C16.4143 10.017 16.7501 9.68121 16.7501 9.267C16.7501 8.85279 16.4143 8.517 16.0001 8.517V10.017ZM9.8751 11.076C9.46089 11.076 9.1251 11.4118 9.1251 11.826C9.1251 12.2402 9.46089 12.576 9.8751 12.576V11.076ZM15.1251 12.576C15.5393 12.576 15.8751 12.2402 15.8751 11.826C15.8751 11.4118 15.5393 11.076 15.1251 11.076V12.576ZM9.1631 5V4.24998L9.15763 4.25002L9.1631 5ZM15.8381 5L15.8438 4.25H15.8381V5ZM19.5001 8.717L18.7501 8.71149V8.717H19.5001ZM19.5001 13.23H18.7501L18.7501 13.2355L19.5001 13.23ZM18.4384 15.8472L17.9042 15.3207L17.9042 15.3207L18.4384 15.8472ZM15.8371 16.947V17.697L15.8426 17.697L15.8371 16.947ZM9.1631 16.947V16.197C9.03469 16.197 8.90843 16.23 8.79641 16.2928L9.1631 16.947ZM5.5001 19H4.7501C4.7501 19.2662 4.89125 19.5125 5.12097 19.6471C5.35068 19.7817 5.63454 19.7844 5.86679 19.6542L5.5001 19ZM5.5001 8.717H6.25012L6.25008 8.71149L5.5001 8.717ZM6.56175 6.09984L6.02756 5.5734H6.02756L6.56175 6.09984ZM9.0001 10.017H16.0001V8.517H9.0001V10.017ZM9.8751 12.576H15.1251V11.076H9.8751V12.576ZM9.1631 5.75H15.8381V4.25H9.1631V5.75ZM15.8324 5.74998C17.4559 5.76225 18.762 7.08806 18.7501 8.71149L20.2501 8.72251C20.2681 6.2708 18.2955 4.26856 15.8438 4.25002L15.8324 5.74998ZM18.7501 8.717V13.23H20.2501V8.717H18.7501ZM18.7501 13.2355C18.7558 14.0153 18.4516 14.7653 17.9042 15.3207L18.9726 16.3736C19.7992 15.5348 20.2587 14.4021 20.2501 13.2245L18.7501 13.2355ZM17.9042 15.3207C17.3569 15.8761 16.6114 16.1913 15.8316 16.197L15.8426 17.697C17.0201 17.6884 18.1461 17.2124 18.9726 16.3736L17.9042 15.3207ZM15.8371 16.197H9.1631V17.697H15.8371V16.197ZM8.79641 16.2928L5.13341 18.3458L5.86679 19.6542L9.52979 17.6012L8.79641 16.2928ZM6.2501 19V8.717H4.7501V19H6.2501ZM6.25008 8.71149C6.24435 7.93175 6.54862 7.18167 7.09595 6.62627L6.02756 5.5734C5.20098 6.41216 4.74147 7.54494 4.75012 8.72251L6.25008 8.71149ZM7.09595 6.62627C7.64328 6.07088 8.38882 5.75566 9.16857 5.74998L9.15763 4.25002C7.98006 4.2586 6.85413 4.73464 6.02756 5.5734L7.09595 6.62627Z"
          fill="#000000"
        />
      </svg>
    );
  };

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
        <Button
          startContent={<CommentIcon size={4} height={4} width={4} />}
          className="rounded-2xl bg-white/25 m-0"
        >
          {props.comments.length}
        </Button>

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
