import CreateImgPost from '@/components/posts/images/createImgPost';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';

export const metadata: Metadata = generateMeta({
  title: 'Drawings | UnderAchievers',
});

export default async function CreateImgPage() {
  return (
    <>
      <div className="flex justify-center">
        <CreateImgPost />
      </div>
    </>
  );
}
