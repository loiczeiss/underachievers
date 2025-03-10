import { forwardRef, useState, useRef, useActionState } from "react";
import { Avatar, Button, Card, Form, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import { Comment, PostType } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import VoteCommentButton from "../vote/voteComment";
import ReplyComment from "./ReplyCommentButton";
import ReplyTextArea from "./ReplyTextArea";
import CommentContentAndReply from "./CommentContentAndReply";


dayjs.extend(relativeTime);

interface CommentProps {
  postId: string;
  comments: Comment[];
  replies: Comment[];
  postType: PostType;
}

const CommentsPost = forwardRef<HTMLTextAreaElement, CommentProps>(
  ({ postId, comments, replies, postType }, ref) => {

    const router = useRouter();
    const [commentContentValue, setCommentContentValue] = useState("");
    const [formState, action] = useActionState(actions.createCommentAction, {
      errors: {},
    });

    const [isHidden, setIsHidden] = useState(true);
    const [commentConfirmationId, setCommentConfirmationId] =
      useState<string>("");
    const session = useSession();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const focusTextarea = () => {
      if (textareaRef.current) {
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 500);
      }
    };

    const handleDeleteComment = async (
      commentId: string,
      postId: string,
      postType: "AUDIO" | "IMAGE" | "TEXT"
    ) => {
      try {
        await actions.deleteComment(commentId, postId, postType);
        alert("Comment deleted successfully!");
        router.refresh(); // Ensures the latest data is fetched without a full reload
      } catch (error) {
        console.log(error);
        alert("Failed to delete comment.");
      }
    };

    const errors =[]
    if (commentContentValue.length < 3 && commentContentValue.length>0) {
      errors.push( "Comment must be at least 3 characters");
    }

    return (
     <> <div className="mb-4">
     <Card isBlurred className="bg-white/25">
       <Form
         action={action}
         className="flex flex-col"
         validationBehavior="native"
       >
         <Textarea
           ref={ref}
         
           errorMessage={errors.length !==0 ? errors : null}
           // validate={(value) =>
           //   value.length < 3 ? "Comment must be at least 3 characters" : ""
           // }
           value={commentContentValue}
           isInvalid={commentContentValue.length < 3 }
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
             base: "border-gray-800",
           }}
           name="content"
           placeholder="Add a comment"
         />
         <input type="hidden" name="postId" value={postId} />
         <input type="hidden" name="postType" value={postType} />
         <Button isDisabled={commentContentValue.length<3? true:false} type="submit" className="w-42 bg-white/50 self-end m-4"
         >
           Comment
         </Button>
       </Form>
     </Card>

     {comments.filter((comment) => comment.parentId === null).length ===
     0 ? (
       <Card isBlurred className="bg-white/25 p-4 mt-2">
         <p>No Comments Yet</p>
       </Card>
     ) : (
       comments
         .filter((comment) => comment.parentId === null) // ✅ Show only top-level comments
         .reverse()
         .map((comment) => (
           <Card isBlurred className="bg-white/25 p-4 mt-2" key={comment.id}>
             <div className="flex items-center pb-2">
               <Avatar
                 src={comment.userImage || ""}
                 className="w-8 h-8 mr-4"
               />
               <p className="text-gray-800 -bold">{comment.userName}</p>
               <p className="text-xs text-gray-700 ml-4">
                 {dayjs().to(dayjs(comment.createdAt))}
               </p>

               <Button
                 onPress={() =>
                   handleDeleteComment(
                     comment.id,
                     postId,
                     comment.postType
                   )
                 }
                 className={`$ {
                   session.data?.user?.id === comment.userId
                     ? "block"
                     : "hidden"
                 } w-48 rounded-xl bg-red-400 ml-auto`}
               >
                 Delete comment
               </Button>
             </div>
             <div 
             // className="pl-12 break-words text-gray-900 py-2 bg-white/25 rounded-xl"
             >
               <CommentContentAndReply
                 comment={comment}
                 replies={replies}
                 parentId={comment.parentId as string}
                 commentId={comment.id as string}
                 postType={comment.postType}
                 session={session}
                 handleDeleteComment={handleDeleteComment}
               />
               <ReplyTextArea
                 isHidden={isHidden}
                 postId={postId}
                 postType={comment.postType}
                 setIsHidden={setIsHidden}
                 ref={textareaRef}
                 commentId={comment.id}
                 commentConfirmationId={commentConfirmationId}
               />
             </div>
             <div className="flex justify-between items-center pt-2">
               
               <VoteCommentButton commentId={comment.id} postType={comment.postType} />
               <ReplyComment
                 commentId={comment.id}
                 commentConfirmationId={commentConfirmationId}
                 setCommentConfirmationId={setCommentConfirmationId}
                 setIsHidden={setIsHidden}
                 isHidden={isHidden}
                 onClick={focusTextarea}
               />
             </div>
           </Card>
         ))
     )}
   </div></>
    );
  }
);


export default CommentsPost;
