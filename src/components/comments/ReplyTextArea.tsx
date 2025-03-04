import { Card, Form, Textarea, Button } from "@nextui-org/react";
import { forwardRef } from "react";

interface ReplyTextAreaProps {
  isHidden: boolean;
}

const ReplyTextArea = forwardRef<HTMLTextAreaElement, ReplyTextAreaProps>(
  ({ isHidden }, ref) => {
    return (
      <Card className={`${isHidden ? "hidden" : "block"} bg-white/25`}>
        <Form className="flex flex-col" validationBehavior="native">
          <Textarea
            ref={ref} 
        
            // isInvalid={!!formState.errors.content}
            // errorMessage={formState.errors.content?.join(", ")}
            // validate={(commentContentValue) => {
            //   if (commentContentValue.length < 3) {
            //     return formState.errors.content?.join(", ");
            //   }
            // }}
            // value={commentContentValue}
            // onValueChange={setCommentContentValue}
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
          <input type="hidden" name="postType" value="AUDIO" />
          <Button type="submit" className="w-42 bg-white/50 self-end m-4">
            Comment
          </Button>
        </Form>
      </Card>
    );
  }
);

export default ReplyTextArea;
