'use client';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Button, Card } from '@heroui/react';
import { Comment, ImgPost } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import CommentButtonPosts from '@/components/comments/CommentButtonPost';
import CommentsPost from '@/components/comments/CommentsPostGeneral';
import VoteButton from '@/components/vote/votePost';

interface ImgPostShowProps {
  post: ImgPost;
  comments: Comment[];
  replies: Comment[];
}

export default function ImgPostShow(props: ImgPostShowProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex w-full flex-col items-center ">
      <Card isBlurred className="m-8 flex items-center lg:w-1/2  lg:px-8 dark:bg-black/25">
        <h1 className="my-4 text-xl uppercase">{props.post.title}</h1>
        <Zoom>
          <Image
            className="mb-4 rounded-xl"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={props.post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        </Zoom>

        <p className="mb-8">{props.post.content}</p>
        <div className="mb-2 flex">
          <VoteButton postId={props.post.id} postType="IMAGE" />
          <CommentButtonPosts commentsLength={props.comments.length} onClick={focusTextarea} />
        </div>
        <CommentsPost
          postId={props.post.id}
          comments={props.comments}
          replies={props.replies}
          postType={props.post.postType}
          ref={textareaRef}
        />
      </Card>
      <Card isBlurred className="mb-4">
        <Button
          id="Back"
          className="bg-white/25"
          onPress={() => router.back()} // Use router.back() for dynamic navigation
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
