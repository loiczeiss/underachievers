import { Avatar, Button } from "@heroui/react";
import { Comment } from "@prisma/client";
import dayjs from "dayjs";
import DeleteIcon from "public/delete.svg"; 
import Image from "next/image";
import VoteCommentButton from "../vote/voteComment";

interface CommentContentAndReplyProps {
  comment: Comment;
  replies: Comment[];
  parentId?: string;
  commentId: string;
  postType: string;
  session: { data: { user: { id: string } } };
  handleDeleteComment: (
    arg0: string,
    arg1: string,
    arg2: "AUDIO" | "TEXT" | "IMAGE"
  ) => void;
}

export default function commentContentAndReply(
  props: CommentContentAndReplyProps
) {
  return (
    <>
      <div className="pl-12 break-words text-gray-900 py-2 bg-white/25 rounded-xl mb-4 text-xs md:text-base dark:bg-black/25 dark:text-zinc-300">
        {props.comment.parentId === null && <p>{props.comment.content}</p>}
      </div>
      {props.replies
        .filter((reply) => reply.parentId === props.commentId) // Filter replies before mapping
        .map((reply) => (
          (<>
            <div className="flex items-center pb-2 pl-12">
              <Avatar src={reply.userImage || ""} className="w-4 h-4  md:w-8 md:h-8 mr-4" />
              <p className="text-gray-800 text-[8px] md:text-base dark:text-zinc-300">{reply.userName}</p>
              <p className="text-[8px] md:text-xs text-gray-700 ml-4 dark:text-zinc-500">
                {dayjs().to(dayjs(reply.createdAt))}
              </p>
              <Button
              name="Delete"
                      isIconOnly
                      onPress={() =>
                        props.handleDeleteComment(
                          reply.id,
                          reply.audioPostId as string,
                          reply.postType
                        )
                      }
                      className={`$ {
                              session.data?.user?.id === comment.userId
                                ? "block"
                                : "hidden"
                            } min-w-[4px] h-8 rounded-3xl  ml-auto bg-white/25 rounded-3xl ml-4 hover:bg-red-400 `}
                    >
                      <Image
                        src={DeleteIcon}
                        alt="Delete"
                        width={20}
                        height={20}
                      />
                    </Button>
            
            </div>
            <div
              className="flex justify-between items-center ml-12 pl-12 break-words text-gray-900 py-2 bg-white/25 rounded-xl mb-4 pr-4 dark:bg-black/25"
              key={reply.id}
            >
              <p className="text-xs md:text-base dark:text-zinc-300">{reply.content}</p>
           
            </div>
            <div className="flex justify-end mb-2"><VoteCommentButton
                commentId={reply.id}
                postType={reply.postType}
              /></div>
          </>) 
        ))}
    </>
  );
}
