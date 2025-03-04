import { Comment } from "@prisma/client";

interface CommentContentAndReplyProps {
  commentContent: string;
  replies: Comment[];
}

export default function commentContentAndReply(
  props: CommentContentAndReplyProps
) {
  return (
    <>
      <div>
        <p>{props.commentContent}</p>
      </div>
      {props.replies.map((reply) => {
        return (
          <>
            <p>{reply.content}</p>
          </>
        );
      })}
    </>
  );
}
