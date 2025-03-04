import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface ReplyCommentButtonProps {
    setIsHidden: Dispatch<SetStateAction<boolean>>;
    isHidden: boolean;
    onClick: ()=>void
}
export default function ReplyComment(props: ReplyCommentButtonProps) {
    function openAndFocusReply(){
        props.setIsHidden(false);
        props.onClick()
    }
  return (
    <>
      <Button className={`${props.isHidden? "block" : "hidden"} bg-white/25`}
      onPress={()=>openAndFocusReply()}>Reply</Button>
<Button className={`${props.isHidden? "hidden" : "block"} bg-red-400`} 
      onPress={()=>props.setIsHidden(true)}>Close</Button>
    </>
  );
}
