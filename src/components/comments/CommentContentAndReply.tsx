import { Avatar, Button } from "@nextui-org/react";
import { Comment } from "@prisma/client";
import dayjs from "dayjs";

import VoteCommentButton from "../vote/voteComment";


interface CommentContentAndReplyProps {
  comment: Comment;
  replies: Comment[];
  parentId?: string;
  commentId: string,
  postType: string,
  session: { data: { user: { id: string; }; }; },
  handleDeleteComment: (arg0: string, arg1: string, arg2: "AUDIO" | "TEXT" | "IMAGE") => void
}

export default function commentContentAndReply(
  props: CommentContentAndReplyProps
) {

  return (
    <>
      <div  className="pl-12 break-words text-gray-900 py-2 bg-white/25 rounded-xl mb-4">
      {props.comment.parentId === null && <p>{props.comment.content}</p>}

      </div>
      {props.replies
  .filter(reply => reply.parentId === props.commentId) // Filter replies before mapping
  .map((reply) => (
    <><div className="flex items-center pb-2 pl-12">
      <Avatar src={reply.userImage || ""} className="w-8 h-8 mr-4" />
      <p className="text-gray-800 -bold">{reply.userName}</p>
      <p className="text-xs text-gray-700 ml-4">
        {dayjs().to(dayjs(reply.createdAt))}
      </p>

      <Button
        onPress={() => props.handleDeleteComment(reply.id, reply.audioPostId as string, reply.postType)}
        className={`${props.session.data?.user?.id === reply.userId ? "block" : "hidden"} min-w-8 h-6 p-0 rounded-xl bg-red-400 ml-auto mr-4`}
      >
        x
      </Button>
    </div><div className="flex justify-between items-center ml-12 pl-12 break-words text-gray-900 py-2 bg-white/25 rounded-xl mb-4 pr-4" key={reply.id}><p>{reply.content}</p><VoteCommentButton commentId={reply.id} postType={reply.postType}  /></div> 
    </> // Added a unique key to prevent React warnings
  ))}

    </>
  );
}
