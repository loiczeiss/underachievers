import { Button } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";

interface ReplyCommentButtonProps {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  isHidden: boolean;
  onClick: () => void;
  commentId: string;
  setCommentConfirmationId: Dispatch<SetStateAction<string>>;
  commentConfirmationId: string;
}
export default function ReplyComment(props: ReplyCommentButtonProps) {
  function openAndFocusReply() {
    props.setCommentConfirmationId(props.commentId);
    props.setIsHidden(false);
    props.onClick();
  }
  return (
    <>
      <Button
      id="Reply"
        className={`${
          props.isHidden || props.commentConfirmationId !== props.commentId
            ? "block"
            : "hidden"
        } bg-white/25 dark:text-zinc-300 dark:bg-black/25 dark:hover:bg-black/75`}
        onPress={() => openAndFocusReply()}
      >
        Reply
      </Button>
      <Button
      id="Close"
        className={`${
          props.isHidden || props.commentConfirmationId !== props.commentId
            ? "hidden"
            : "block"
        } bg-red-400 dark:text-zinc-300 dark:bg-black/25`}
        onPress={() => props.setIsHidden(true)}
      >
        Close
      </Button>
    </>
  );
}
