'use client';

import paths from '@/paths';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '@/app/index.scss';
import { useState, useEffect } from 'react';
import { Comment, PostType } from '@prisma/client';
import CommentButton from '@/components/comments/CommentButtonLists';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import VoteButton from '@/components/vote/votePost';
import Image from 'next/image';

interface AudioData {
  id: string;
  url: string;
  displayName: string;
}

interface AllPostListprops {
  audios: AudioData[];
  posts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    audioId?: string; // Optional, since not all posts have `audioId`
    imgUrl?: string; // Optional for non-image posts
    createdAt: Date;
    updatedAt: Date;
    type: string;
    postType: PostType;
  }[];
  comments: Comment[];
}

export const dynamicParams = true;

export default function AllPostList(props: AllPostListprops) {
  const [audioMap, setAudioMap] = useState<{ [key: string]: AudioData | null }>({});

  // Associate audios with posts on initial render
  useEffect(() => {
    const audioDataMap = props.audios.reduce(
      (acc, audio) => {
        acc[audio.id] = audio;
        return acc;
      },
      {} as { [key: string]: AudioData }
    );

    setAudioMap(audioDataMap);
  }, [props.audios]);

  const noPostYet = (
    <Card isBlurred className="mx-8 mb-4 px-2 py-4 sm:px-8 lg:mr-8">
      <p>No posts yet.</p>
    </Card>
  );

  const renderedImgPosts = [...props.posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((post) => {
      const audio = post.audioId ? audioMap[post.audioId] : null; // Get associated audio for the post
      const postComments = props.comments.filter((comment) => {
        if (post.type === 'TEXT') return comment.textPostId === post.id;
        if (post.type === 'IMAGE') return comment.imgPostId === post.id;
        if (post.type === 'AUDIO') return comment.audioPostId === post.id;
        return false;
      });

      const handleRedirect = (post: (typeof props.posts)[number]) => {
        if (post.imgUrl) {
          return paths.imgPostShow(post.id);
        } else if (post.audioId) {
          return paths.audioPostShowPage(post.id);
        } else {
          return paths.textPostShow(post.id);
        }
      };

      return (
        <Card isBlurred className="mb-4 px-2 py-4 sm:px-8 lg:mx-8 dark:bg-black/25" key={post.id}>
          <div className="uppercase lg:text-2xl dark:text-zinc-300">{post.title}</div>

          {audio ? (
            <AudioPlayer
              header={audio.displayName}
              className="mb-2 mt-4 dark:invert"
              autoPlay={false}
              src={audio.url}
            />
          ) : post.audioId ? (
            <p>Loading audio...</p>
          ) : null}
          {post.imgUrl && (
            <Zoom>
              {' '}
              <Image
                className="mb-0 mt-4 rounded-xl"
                width={300} // Adjust width as needed
                height={200} // Adjust height as needed
                src={post.imgUrl}
                sizes="100vw"
                alt="Uploaded Image"
                priority={true}
              />
            </Zoom>
          )}
          <Card isBlurred className="mb-4 mt-2 p-2 text-sm lg:text-base dark:text-zinc-300">
            {post.content}
          </Card>
          <div className="flex w-full justify-between">
            <div className="flex">
              {' '}
              <VoteButton postId={post.id} postType={post.postType} />
              <CommentButton
                commentsLength={postComments.length}
                postId={post.id}
                postType={post.postType}
                post={post}
              />
            </div>

            <div className="">
              {' '}
              <Button
                as={Link} // Pass the Link component directly to the Button
                className="w-12 bg-white/25 md:w-48 lg:w-64 dark:bg-black/25 dark:text-zinc-300"
                href={handleRedirect(post)}
                id="View"
              >
                View
              </Button>
            </div>
          </div>
        </Card>
      );
    });

  return (
    <div className="my-4 flex w-5/6 flex-col self-center overscroll-contain lg:w-4/6">
      {props.posts.length === 0 ? noPostYet : renderedImgPosts}
    </div>
  );
}
