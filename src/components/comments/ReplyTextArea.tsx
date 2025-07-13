import { Card, Form, Textarea, Button } from '@heroui/react';
import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';

interface ReplyTextAreaProps {
  isHidden: boolean;
  commentConfirmationId: string;
  commentId: string;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  postType: string;
  postId: string;
}

// eslint-disable-next-line react/display-name
const ReplyTextArea = forwardRef<HTMLTextAreaElement, ReplyTextAreaProps>(
  ({ isHidden, commentConfirmationId, commentId, setIsHidden, postId, postType }, ref) => {
    const [commentContentValue, setCommentContentValue] = useState('');
    const [formState, action] = useFormState(actions.createReplyCommentAction, {
      errors: {},
    });
    const session = useSession();

    useEffect(() => {
      if (session.status === 'unauthenticated') {
        setIsHidden(true);
      }
    }, [session]);
    return (
      <Card
        className={`${
          !isHidden && commentConfirmationId === commentId ? 'block' : 'hidden'
        } bg-white/25 dark:bg-black/55 `}
      >
        <Form action={action} className="flex flex-col" validationBehavior="native">
          <Textarea
            ref={ref}
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(', ')}
            validate={(commentContentValue) => {
              if (commentContentValue.length < 3) {
                return formState.errors.content?.join(', ');
              }
            }}
            value={commentContentValue}
            onValueChange={setCommentContentValue}
            variant="bordered"
            isClearable
            classNames={{
              input: 'placeholder:text-gray-600 dark:placeholder:text-zinc-300',
              inputWrapper: [
                'border-none',
                'hover:border-black',
                'focus-within:!border-white/50',
                'dark:text-zinc-300',
              ],
              errorMessage: ['bg-white/25 ', 'rounded-lg', 'p-4'],
              base: ['border-gray-800 '],
            }}
            name="content"
            placeholder="Reply..."
          />
          <input type="hidden" name="parentId" value={commentId} />
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="postType" value={postType} />
          <Button
            type="submit"
            id="Comment"
            className="w-42 m-4 self-end bg-white/50 dark:bg-black/25 dark:text-zinc-300"
          >
            Comment
          </Button>
        </Form>
      </Card>
    );
  }
);

export default ReplyTextArea;
