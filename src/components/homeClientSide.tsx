'use client';

import AllPostList from './posts/all/AllPostsList';
import NavLinks from './navLinks';
import { Audio, AudioPost, Comment, ImgPost, PostType, TextPost } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, useDisclosure } from '@heroui/react';
import { useEffect } from 'react';
import Image from 'next/image';
import CharaPng from 'public/charaDS.png';

interface AllPostListprops {
  audios: Audio[];
  allPosts: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    postType: PostType;
  }[];
  textPosts: TextPost[];
  imgPosts: ImgPost[];
  audioPosts: AudioPost[];
  comments: Comment[];
}

export default function HomeClientSide(props: AllPostListprops) {
  const { audios, allPosts, comments } = props;
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const session = useSession();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      <div className="flex w-full flex-col lg:flex-row ">
        <NavLinks />

        <AllPostList posts={allPosts} audios={audios} comments={comments} />
        {session.status !== 'authenticated' && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="sm"
            placement="center"
            className="rounded-xl shadow-xl"
            classNames={{ closeButton: 'text-white' }}
          >
            <ModalContent
              className={'flex flex-col items-center space-y-4 bg-transparent p-6 text-center'}
            >
              <h1 className={'text-2xl underline'}>Let&#39;s walk together</h1>
              <div className={' relative h-[350px] w-64'}>
                <Image
                  src={CharaPng.src}
                  alt={'Sam Porter Bridges logo'}
                  className={'object-cover'}
                  fill
                />
              </div>
              <p className="text-lg font-medium text-gray-800 ">
                To see comments and votes, please sign in
              </p>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}
