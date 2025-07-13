import UserClientSide from '@/components/userClientSide';
import { db } from '@/db';

interface Props {
  params: Promise<{ id: string }>;
}
export default async function MyPost(props: Props) {
  const params = await props.params;
  const userId = params.id;

  const textPosts = await db.textPost.findMany({
    where: { userId },
    cacheStrategy: { swr: 60 },
  });

  const imgPosts = await db.imgPost.findMany({
    where: { userId },
    cacheStrategy: { swr: 60 },
  });
  const audioPosts = await db.audioPost.findMany({
    where: { userId },
    cacheStrategy: { swr: 60 },
  });
  const audios = await db.audio.findMany({
    where: { userId },
    cacheStrategy: { swr: 60 },
  });
  const comments = await db.comment.findMany({ cacheStrategy: { swr: 60 } });

  const allPosts = [
    ...textPosts.map((post) => ({ ...post, type: 'TEXT' })),
    ...imgPosts.map((post) => ({ ...post, type: 'IMAGE' })),
    ...audioPosts.map((post) => ({ ...post, type: 'AUDIO' })),
  ];
  return (
    <>
      <UserClientSide
        allPosts={allPosts}
        textPosts={textPosts}
        imgPosts={imgPosts}
        audioPosts={audioPosts}
        audios={audios}
        comments={comments}
      />
    </>
  );
}
