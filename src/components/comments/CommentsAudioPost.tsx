import { forwardRef, useEffect, useState } from "react";
import { Avatar, Button, Card, Form, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { PostType } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import VoteCommentButton from "../vote/voteComment";

dayjs.extend(relativeTime);

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
    audioPostId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  deleteCommentTextPost?: (commentId: string, audioPostId: string) => void;
}

const CommentsAudioPost = forwardRef<HTMLTextAreaElement, CommentProps>(
  ({ postId, comments }, ref) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter();
    const [commentContentValue, setCommentContentValue] = useState("");
    const [formState, action] = useFormState(actions.createCommentAudioAction, {
      errors: {},
    });

    const session = useSession();

    useEffect(() => {
      if (isDeleted) {
        router.push(`${postId}`); // Redirect after deletion
      }
    }, [isDeleted, router, postId]);

    const handleDeleteComment = async (commentId: string, audioPostId: string) => {
      try {
        await actions.deleteCommentAudioPost(commentId, audioPostId);
        alert("Comment deleted successfully!");
        setIsDeleted(true);
      } catch (error) {
        console.log(error);
        alert("Failed to delete comment.");
      }
    };

    return (
      <div className="mb-4">
        <Card isBlurred className="bg-white/25">
          <Form action={action} className="flex flex-col" validationBehavior="native">
            <Textarea
              ref={ref} // ✅ Correctly forward ref
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
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
            <input type="hidden" name="audioPostId" value={postId} />
            <input type="hidden" name="postType" value={"AUDIO"} />
            <Button type="submit" className="w-42 bg-white/50 self-end m-4">
              Comment
            </Button>
          </Form>
        </Card>

        {comments.length === 0 ? (
          <Card isBlurred className="bg-white/25 p-4 mt-2">
            <p>No Comments Yet</p>
          </Card>
        ) : (
          [...comments].reverse().map((comment) => (
            <Card isBlurred className="bg-white/25 p-4 mt-2" key={comment.id}>
              <div className="flex items-center">
                <Avatar src={comment.userImage || ""} className="w-8 h-8 mr-4" />
                <p className="text-gray-800">{comment.userName}</p>
                <p className="text-xs text-gray-700 ml-4">
                  {dayjs().to(dayjs(comment.createdAt))}
                </p>
              </div>
              <p className="ml-12 break-words text-gray-800">{comment.content}</p>
              <div className="flex justify-between">
                <VoteCommentButton commentId={comment.id} />
                <Button
                  onPress={() => handleDeleteComment(comment.id, comment.audioPostId as string)}
                  className={`${
                    session.data?.user?.id === comment.userId ? "block" : "hidden"
                  } w-48 rounded-xl bg-red-400 self-end mt-2`}
                >
                  Delete comment
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    );
  }
);

export default CommentsAudioPost;
