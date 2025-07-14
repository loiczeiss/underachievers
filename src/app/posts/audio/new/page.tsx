import CreateAudioPost from '@/components/posts/audio/createAudioPost';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';

export const metadata: Metadata = generateMeta({
  title: 'Audio | UnderAchievers',
});

export default async function CreateAudioPage() {
  return (
    <>
      <div className="flex justify-center">
        <CreateAudioPost />
      </div>
    </>
  );
}
