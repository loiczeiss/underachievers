'use client';

import CommentButton from '@/components/comments/CommentButtonLists';
import VoteButton from '@/components/vote/votePost';
import paths from '@/paths';
import { Card, Button } from '@heroui/react';
import { Comment, PostType } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ImgPostListprops {
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postType: PostType;
  }[];
  comments: Comment[];
}

export const dynamicParams = true;

export default function UserImgPostList(props: ImgPostListprops) {
  const noPostYet = (
    <Card
      isBlurred
      className="mx-8 mb-4 px-2 py-4 sm:px-8 lg:mr-8 dark:bg-black/25 dark:text-zinc-300"
    >
      <p>No posts yet.</p>
    </Card>
  );
  const renderedImgPosts = [...props.posts].reverse().map((post) => {
    return (
      <Card
        isBlurred
        className="mx-8 mb-4 px-2 py-4 sm:px-8 lg:mr-8 dark:bg-black/25 dark:text-zinc-300"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl"> {post.title}</div>
        <Zoom>
          <CldImage
            className="mt-4 rounded-xl "
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            src={post.imgUrl}
            sizes="100vw"
            alt="Uploaded Image"
          />
        </Zoom>
        <Card
          isBlurred
          className="mb-4 mt-2 p-2 text-sm lg:text-base dark:bg-black/25 dark:text-zinc-300"
        >
          {post.content}
        </Card>
        <div className="flex w-full justify-between">
          <div className="flex">
            <VoteButton postId={post.id} postType={post.postType} />
            <CommentButton
              commentsLength={props.comments.length}
              post={post}
              postType={post.postType}
              postId={post.id}
            />
          </div>
          <div>
            {' '}
            <Button
              id="View"
              as={Link} // Use Link as the underlying component
              href={`${paths.userImgPostPage(post.userId, post.id)}`}
              className="bg-white/25 lg:w-64 dark:bg-black/25 dark:text-zinc-300"
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    );
  });
  return (
    <>
      <div className="my-4 flex flex-col self-center overscroll-contain lg:w-4/6">
        {props.posts.length === 0 ? noPostYet : renderedImgPosts}
      </div>
    </>
  );
}
