import HomeClientSide from "@/components/homeClientSide";
import UserClientSide from "@/components/userClientSide";
import { db } from "@/db";

interface Props {
    params: Promise<{ id: string }>;
  }
export default async function MyPost(props: Props) {
  const params = await props.params;
  const userId = params.id


    const textPosts = await db.textPost.findMany({
        where:{userId}
    });
  
    const imgPosts = await db.imgPost.findMany({
      where:{userId}
    });

    const audioPosts = await db.audioPost.findMany({where:{userId}});
    const audios = await db.audio.findMany({where:{userId}})

    const allPosts = [
        ...textPosts.map((post) => ({ ...post, type: "TEXT" })),
        ...imgPosts.map((post) => ({ ...post, type: "IMAGE" })),
        ...audioPosts.map((post)=> ({...post, type: "AUDIO"}))
      ];
  return (
    <>
      <UserClientSide allPosts={allPosts} textPosts={textPosts} imgPosts={imgPosts} audioPosts={audioPosts} />
    </>
  );
}
