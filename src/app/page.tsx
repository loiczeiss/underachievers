"use server";
import Welcome from "@/components/welcome";
import { db } from "@/db";
import { auth } from "@/auth";
import HomeClientSide from "@/components/homeClientSide";
export default async function Home() {
  const textPosts = await db.textPost.findMany();

  const imgPosts = await db.imgPost.findMany({ cacheStrategy: { swr: 60 } });

  const audioPosts = await db.audioPost.findMany({
    cacheStrategy: { swr: 60 },
  });

  // Combine the results into a unified array
  const allPosts = [
    ...textPosts.map((post) => ({ ...post, type: "TEXT" })),
    ...imgPosts.map((post) => ({ ...post, type: "IMAGE" })),
    ...audioPosts.map((post) => ({ ...post, type: "AUDIO" })),
  ];
  const audios = await db.audio.findMany({ cacheStrategy: { swr: 60 } });

  const comments = await db.comment.findMany({ cacheStrategy: { swr: 60 } });

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
