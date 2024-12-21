import HomeClientSide from "@/components/homeClientSide";
import UserClientSide from "@/components/userClientSide";
import { db } from "@/db";

interface Props {
    params: Promise<{ id: string }>;
  }
export default async function MyPost(props: Props) {
  const params = await props.params;
  const userId = params.id
  console.log(userId)

    const textPosts = await db.textPost.findMany({
        where:{userId: userId}
    });
  
    const imgPosts = await db.imgPost.findMany({
      where:{userId: userId}
    });
    const allPosts = [
        ...textPosts.map((post) => ({ ...post, type: "TEXT" })),
        ...imgPosts.map((post) => ({ ...post, type: "IMAGE" })),
      ];
  return (
    <>
      <UserClientSide allPosts={allPosts} textPosts={textPosts} imgPosts={imgPosts}/>
    </>
  );
}
