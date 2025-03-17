import Welcome from "@/components/welcome";
import { db } from "@/db";
import { auth } from "@/auth";
import HomeClientSide from "@/components/homeClientSide";
import Loading from "./loading";


export default async function Home() {
  const textPosts = await db.textPost.findMany({});

  const imgPosts = await db.imgPost.findMany();

  const audioPosts = await db.audioPost.findMany();

  // Combine the results into a unified array
  const allPosts = [
    ...textPosts.map((post) => ({ ...post, type: "TEXT" })),
    ...imgPosts.map((post) => ({ ...post, type: "IMAGE" })),
    ...audioPosts.map((post)=> ({...post, type: "AUDIO"}))
  ];
const audios = await db.audio.findMany()
  // // Sort posts by creation date
  // const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
const comments = await db.comment.findMany();


  const session = await auth();

  if (!session || !session.user) {
    return (
      <>
        <Welcome />
      </>
    );
  } else {
    return (
      <>
      {/* <Loading/> */}
 <HomeClientSide
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
}

{
}
