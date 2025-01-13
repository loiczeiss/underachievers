"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Vote } from "@prisma/client";

export async function handleVoteText(postId: string) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }
  const existingLike = await db.vote.findFirst({
    where: {
      userId: session.user.id as string,
      textPostId: postId,
    },
  });
  
  let vote: Vote
  try {
    if(existingLike){
      await db.vote.delete({where:{id:existingLike.id}})
      return {success: false}
    }else{vote = await db.vote.create({
      data: {
        userId: session.user.id as string,
        voteType: "UP",
       textPostId: postId,
      },
    });    return { success: true, vote };}
 


  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create vote due to an unknown error."],
        },
      };
    }
  }
}
