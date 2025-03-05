import { Card, Form, Textarea, Button } from "@nextui-org/react";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
interface ReplyTextAreaProps {
  isHidden: boolean;
  commentConfirmationId: string;
  commentId: string;
  setIsHidden: Dispatch<SetStateAction<boolean>>
  postType: string;
  postId: string
}

const ReplyTextArea = forwardRef<HTMLTextAreaElement, ReplyTextAreaProps>(
  ({ isHidden, commentConfirmationId, commentId, setIsHidden, postId, postType }, ref) => {
 const [commentContentValue, setCommentContentValue] = useState("");
    const [formState, action] = useFormState(actions.createReplyCommentAction, {
      errors: {},
    });


    return (
      <Card
        className={`${
          !isHidden && commentConfirmationId === commentId ? "block" : "hidden"
        } bg-white/25`}
      >
        <Form action={action} className="flex flex-col" validationBehavior="native">
          <Textarea
            ref={ref}
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
              base: ["border-gray-800"],
            }}
            name="content"
            placeholder="Reply..."
          />
          <input type="hidden" name="parentId" value={commentId} />
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="postType" value={postType} />
          <Button type="submit" 
          onPress={()=>console.log("ferfe")}
          // onPress={()=>setTimeout(()=>setIsHidden(true), 1000)}
           className="w-42 bg-white/50 self-end m-4">
            Comment
          </Button>
        </Form>
      </Card>
    );
  }
);

export default ReplyTextArea;
