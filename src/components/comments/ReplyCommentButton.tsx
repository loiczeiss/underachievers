import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface ReplyCommentButtonProps {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  isHidden: boolean;
  onClick: () => void;
  commentId: string;
  setCommentConfirmationId: Dispatch<SetStateAction<string>>;
  commentConfirmationId: string
}
export default function ReplyComment(props: ReplyCommentButtonProps) {
  function openAndFocusReply() {
    props.setCommentConfirmationId(props.commentId)
    props.setIsHidden(false);
    props.onClick();
  }
  return (
    <>
      <Button
        className={`${props.isHidden || props.commentConfirmationId !== props.commentId  ? "block" : "hidden"} bg-white/25`}
        onPress={() => openAndFocusReply()}
      >
        Reply
      </Button>
      <Button
        className={`${props.isHidden || props.commentConfirmationId !== props.commentId ? "hidden" : "block"} bg-red-400`}
        onPress={() => props.setIsHidden(true)}
      >
        Close
      </Button>
    </>
  );
}
