'use client';

import { Button, Card } from '@heroui/react';
import paths from '@/paths';
import { redirect } from 'next/navigation';
import { Comment, PostType } from '@prisma/client';
import CommentButtonPosts from '@/components/comments/CommentButtonPost';
import VoteButton from '@/components/vote/votePost';
import { useRef } from 'react';
import CommentsPost from '@/components/comments/CommentsPostGeneral';

interface Post {
  title: string;
  content: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  postType: PostType;
}

interface PostShowProps {
  replies: Comment[];
  comments: Comment[];
  post: Post;
  deletePost?: (formData: FormData) => void | Promise<void>;
}

export default function UserTextPostShow(props: PostShowProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Card
          isBlurred
          className="m-8 flex items-center lg:w-1/2  lg:px-8 dark:bg-black/25 dark:text-zinc-300"
        >
          <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
          <Card
            isBlurred
            className="mb-4 mt-2 p-2 text-sm lg:text-base dark:bg-black/25 dark:text-zinc-300"
          >
            {props.post.content}
          </Card>
          <div className="mb-2 flex">
            {' '}
            <VoteButton postId={props.post.id} postType="TEXT" />
            <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea} />
          </div>
          <CommentsPost
            postId={props.post.id}
            comments={props.comments}
            replies={props.replies}
            ref={textareaRef}
            postType={props.post.postType}
          />
          <form action={props.deletePost}>
            <Button id="Delete" className="mb-4 w-48 bg-red-400" type="submit">
              Delete the post
            </Button>
          </form>
        </Card>{' '}
        <Card isBlurred className="mb-4">
          {' '}
          <Button
            id="Back"
            className="bg-transparent dark:bg-black/25 dark:text-zinc-300 dark:hover:bg-black/75"
            onPress={() => redirect(paths.userPostsPage(props.post.userId))}
          >
            Back
          </Button>
        </Card>
      </div>
    </>
  );
}
