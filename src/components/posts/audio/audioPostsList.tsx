'use client';

import { useEffect, useState } from 'react';
import paths from '@/paths';
import { Card, Button } from '@heroui/react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '@/app/index.scss';
import Link from 'next/link';
import { Comment, PostType } from '@prisma/client';
import CommentButton from '@/components/comments/CommentButtonLists';
import VoteButton from '@/components/vote/votePost';
import { useTheme } from 'next-themes';

interface AudioData {
  id: string;
  url: string;
  displayName: string;
}

interface AudioPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  audioId: string;
  postType: PostType;
}

interface AudioPostListProps {
  posts: AudioPost[];
  audios: AudioData[];
  comments: Comment[];
}

export const dynamicParams = true;

export default function AudioPostList(props: AudioPostListProps) {
  const [audioMap, setAudioMap] = useState<{ [key: string]: AudioData | null }>({});
;
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
    <Card
      isBlurred
      className="mx-8 mb-4 px-2 py-4 sm:px-8 lg:mr-8 dark:bg-black/25 dark:text-zinc-300"
    >
      <p>No posts yet.</p>
    </Card>
  );

  const renderedAudioPosts = [...props.posts].reverse().map((post) => {
    const audio = audioMap[post.audioId];

    return (
      <Card
        isBlurred
        className="mb-4 px-2 py-4 sm:px-8 lg:mx-8 dark:bg-black/25 dark:text-zinc-300"
        key={post.id}
      >
        <div className="uppercase lg:text-2xl">{post.title}</div>

        {audio ? (
          <AudioPlayer
            header={`${audio.displayName}`}
            className="mb-2 mt-4 dark:invert"
            autoPlay={false}
            src={audio.url}
          />
        ) : (
          <p>Loading audio...</p>
        )}

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
              postId={post.id}
              postType={post.postType}
              post={post}
            />
          </div>
          <div>
            {' '}
            <Button
              id="View"
              as={Link}
              href={`${paths.audioPostShowPage(post.id)}`}
              className="w-12 bg-white/25 md:w-48 lg:w-64 dark:bg-black/25 dark:text-zinc-300"
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
      {props.posts.length === 0 ? noPostYet : renderedAudioPosts}
    </div>
  );
}
