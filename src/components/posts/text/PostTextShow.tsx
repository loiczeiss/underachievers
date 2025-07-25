'use client';

import { Button, Card } from '@heroui/react';
import { Comment, TextPost } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import CommentButtonPosts from '@/components/comments/CommentButtonPost';
import CommentsPost from '@/components/comments/CommentsPostGeneral';
import VoteButton from '@/components/vote/votePost';

interface PostShowProps {
  post: TextPost;
  comments: Comment[];
  replies: Comment[];
}

export default function TextPostShow(props: PostShowProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <div className="flex w-full flex-col items-center">
      {' '}
      <Card
        isBlurred
        className="m-8 flex items-center lg:w-1/2  lg:px-8 dark:bg-black/25 dark:text-zinc-300"
      >
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <p className="mb-8">{props.post.content}</p>
        <div className="mb-2 flex">
          <VoteButton postId={props.post.id} postType="TEXT" />
          <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea} />
        </div>
        <CommentsPost
          postId={props.post.id}
          comments={props.comments}
          ref={textareaRef}
          replies={props.replies}
          postType={props.post.postType}
        />
      </Card>{' '}
      <Card isBlurred className="mb-4">
        {' '}
        <Button id="Back" className="bg-white/25" onPress={() => router.back()}>
          Back
        </Button>
      </Card>
    </div>
  );
}
