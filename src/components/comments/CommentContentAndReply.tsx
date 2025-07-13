import { Avatar, Button } from '@heroui/react';
import { Comment } from '@prisma/client';
import dayjs from 'dayjs';
import DeleteIcon from 'public/delete.svg';
import Image from 'next/image';
import VoteCommentButton from '../vote/voteComment';
import { useSession } from 'next-auth/react';

interface CommentContentAndReplyProps {
  comment: Comment;
  replies: Comment[];
  parentId?: string;
  commentId: string;
  postType: string;
  handleDeleteComment: (arg0: string, arg1: string, arg2: 'AUDIO' | 'TEXT' | 'IMAGE') => void;
}

export default function CommentContentAndReply(props: CommentContentAndReplyProps) {
  const session = useSession();
  return (
    <>
      <div className="mb-4 break-words rounded-xl bg-white/25 py-2 pl-12 text-xs text-gray-900 md:text-base dark:bg-black/25 dark:text-zinc-300">
        {props.comment.parentId === null && <p>{props.comment.content}</p>}
      </div>
      {props.replies
        .filter((reply) => reply.parentId === props.commentId) // Filter replies before mapping
        .map((reply) => (
          <>
            <div
              className={`flex items-center pb-2 pl-12 ${session.status !== 'unauthenticated' ? '' : 'hidden'}`}
            >
              <Avatar src={reply.userImage || ''} className="mr-4 size-4  md:size-8" />
              <p className="text-[8px] text-gray-800 md:text-base dark:text-zinc-300">
                {reply.userName}
              </p>
              <p className="ml-4 text-[8px] text-gray-700 md:text-xs dark:text-zinc-500">
                {dayjs().to(dayjs(reply.createdAt))}
              </p>
              <Button
                id="Delete"
                isIconOnly
                onPress={() =>
                  props.handleDeleteComment(reply.id, reply.audioPostId as string, reply.postType)
                }
                className={`${
                  session?.data?.user?.id === reply.userId ? 'block' : 'hidden'
                } ml-4 h-8 min-w-[4px] rounded-3xl bg-white/25 hover:bg-red-400`}
              >
                <Image src={DeleteIcon} alt="Delete" width={20} height={20} />
              </Button>
            </div>
            <div
              className="mb-4 ml-12 flex items-center justify-between break-words rounded-xl bg-white/25 py-2 pl-12 pr-4 text-gray-900 dark:bg-black/25"
              key={reply.id}
            >
              <p className="text-xs md:text-base dark:text-zinc-300">{reply.content}</p>
            </div>
            <div className="mb-2 flex justify-end">
              <VoteCommentButton commentId={reply.id} postType={reply.postType} />
            </div>
          </>
        ))}
    </>
  );
}
