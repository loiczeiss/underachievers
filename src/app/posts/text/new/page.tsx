import { Metadata } from 'next';

export const metadata: Metadata = generateMeta({
  title: 'Writings | UnderAchievers',
});

import CreateTextPost from '@/components/posts/text/createTextPost';
import { generateMeta } from '@/lib/metadata';

export default function CreateText() {
  return (
    <>
      <CreateTextPost />
    </>
  );
}
