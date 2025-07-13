'use client';

import AllPostList from './posts/all/AllPostsList';
import NavLinks from './navLinks';
import { Audio, AudioPost, Comment, ImgPost, PostType, TextPost } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, useDisclosure, Card } from '@heroui/react';
import { useEffect } from 'react';

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
          >
            <ModalContent className={'bg-transparent'}>
              <Card className="p-6 text-center" isBlurred>
                <p className="text-lg font-medium text-gray-800">
                  To see comments and votes, please sign in
                </p>
              </Card>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}
