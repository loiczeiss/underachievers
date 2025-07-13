import { forwardRef, useState, useRef, useActionState } from 'react';
import { Avatar, Button, Card, Form, Textarea } from '@heroui/react';
import * as actions from '@/actions';
import { Comment, PostType } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import VoteCommentButton from '../vote/voteComment';
import ReplyComment from './ReplyCommentButton';
import ReplyTextArea from './ReplyTextArea';
import CommentContentAndReply from './CommentContentAndReply';
import DeleteIcon from 'public/delete.svg';
import Image from 'next/image';

dayjs.extend(relativeTime);

interface CommentProps {
  postId: string;
  comments: Comment[];
  replies: Comment[];
  postType: PostType;
}

// eslint-disable-next-line react/display-name
const CommentsPost = forwardRef<HTMLTextAreaElement, CommentProps>(
  ({ postId, comments, replies, postType }, ref) => {
    const router = useRouter();
    const [commentContentValue, setCommentContentValue] = useState('');
    const [state, formAction] = useActionState(actions.createCommentAction, {
      errors: {},
    });

    const [isHidden, setIsHidden] = useState(true);
    const [commentConfirmationId, setCommentConfirmationId] = useState<string>('');
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
      postType: 'AUDIO' | 'IMAGE' | 'TEXT'
    ) => {
      try {
        await actions.deleteComment(commentId, postId, postType);
        alert('Comment deleted successfully!');
        router.refresh(); // Ensures the latest data is fetched without a full reload
      } catch (error) {
        console.log(error);
        alert('Failed to delete comment.');
      }
    };

    const isTooShort = commentContentValue.length > 0 && commentContentValue.length < 3;
    const serverError = state.errors?.content;

    return (
      <div className={`mx-4 mb-4 lg:w-full ${session.status === 'authenticated' ? '' : 'hidden'}`}>
        <Card isBlurred className="bg-white/25 dark:bg-black/25">
          <Form action={formAction} className="flex flex-col" validationBehavior="native">
            <Textarea
              ref={ref}
              name="content"
              value={commentContentValue}
              isInvalid={isTooShort || Boolean(serverError)}
              errorMessage={
                isTooShort ? 'Comment must be at least 3 characters' : serverError || null
              }
              onValueChange={setCommentContentValue}
              variant="bordered"
              isClearable
              classNames={{
                input:
                  'placeholder:text-gray-600 dark:placeholder:text-zinc-300 dark:text-zinc-200',
                inputWrapper: [
                  'border-none',
                  'hover:border-black',
                  'focus-within:!border-white/50',
                ],
                errorMessage: ['bg-white/25', 'rounded-lg', 'p-4'],
                base: 'border-gray-800',
              }}
              placeholder="Add a comment"
            />
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="postType" value={postType} />
            <Button
              id="Comment"
              isDisabled={commentContentValue.length < 3}
              type="submit"
              className="w-42 m-4 self-end bg-white/50  dark:bg-black/25 dark:text-zinc-300"
            >
              Comment
            </Button>
          </Form>
        </Card>

        {comments.filter((comment) => comment.parentId === null).length === 0 ? (
          <Card isBlurred className="mt-2 bg-white/25 p-4 dark:bg-black/25 dark:text-zinc-300">
            <p>No Comments Yet</p>
          </Card>
        ) : (
          comments
            .filter((comment) => comment.parentId === null)
            .reverse()
            .map((comment) => (
              <Card isBlurred className="mt-2 bg-white/25 p-4 dark:bg-black/25" key={comment.id}>
                <div className="flex w-full items-center pb-2">
                  <Avatar src={comment.userImage || ''} className="mr-4 size-4  md:size-8" />
                  <p className="text-[8px] text-gray-800 md:text-base dark:text-zinc-300">
                    {comment.userName}
                  </p>
                  <p className="ml-4 text-[8px] text-gray-700 md:text-xs dark:text-zinc-500">
                    {dayjs().to(dayjs(comment.createdAt))}
                  </p>
                  <Button
                    id="Delete"
                    isIconOnly
                    onPress={() => handleDeleteComment(comment.id, postId, comment.postType)}
                    className={`${
                      session.data?.user?.id === comment.userId ? 'block' : 'hidden'
                    } ml-4  h-8  min-w-[4px] rounded-3xl bg-white/25 hover:bg-red-400`}
                  >
                    <Image src={DeleteIcon} alt="Delete" width={20} height={20} />
                  </Button>
                </div>
                <div>
                  <CommentContentAndReply
                    comment={comment}
                    replies={replies}
                    parentId={comment.parentId as string}
                    commentId={comment.id as string}
                    postType={comment.postType}
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
                <div className="flex items-center justify-between pt-2">
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
      </div>
    );
  }
);

export default CommentsPost;
