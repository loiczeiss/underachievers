import { Avatar, Button } from "@nextui-org/react";
import { Comment } from "@prisma/client";
import dayjs from "dayjs";
import { comment } from "postcss";

interface CommentContentAndReplyProps {
  comment: Comment;
  replies: Comment[];
  parentId?: string;
  commentId: string,
  postType: string,
  session,
  handleDeleteComment
}

export default function commentContentAndReply(
  props: CommentContentAndReplyProps
) {
  console.log(props.commentId)
  return (
    <>
      <div>
      {props.comment.parentId === null && <p>{props.comment.content}</p>}

      </div>
      {props.replies
  .filter(reply => reply.parentId === props.commentId) // Filter replies before mapping
  .map((reply) => (
    <><div className="flex items-center pb-2">
      <Avatar src={props.comment.userImage || ""} className="w-8 h-8 mr-4" />
      <p className="text-gray-800 -bold">{props.comment.userName}</p>
      <p className="text-xs text-gray-700 ml-4">
        {dayjs().to(dayjs(props.comment.createdAt))}
      </p>

      <Button
        onPress={() => props.handleDeleteComment(props.comment.id, props.comment.audioPostId as string)}
        className={`${props.session.data?.user?.id === props.comment.userId ? "block" : "hidden"} min-w-8 h-6 p-0 rounded-xl bg-red-400 ml-auto mr-4`}
      >
        x
      </Button>
    </div><p className="" key={reply.id}>{reply.content}</p> 
    </> // Added a unique key to prevent React warnings
  ))}

    </>
  );
}
