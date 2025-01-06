"use server"


import { db } from "@/db"
import { auth } from "@/auth"
import type { Like, PostType } from "@prisma/client"
import paths from "@/paths"



export async function createLikeAction(userId: string, _postId: string, _postType: PostType, _commentId: string){


    const session = await auth();
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be signed in to do this."],
        },
      };
    }

    let like: Like
    try{
        like = await db.like.create({
            data:{
                userId: userId,
                postId: _postId,
                postType:_postType,
                commentId: _commentId
            }
        })


    }catch (err: unknown) {
        if (err instanceof Error) {
          return {
            errors: {
              _form: [err.message],
            },
          };
        } else {
          return {
            errors: {
              _form: ["Failed to create like due to an unknown error."],
            },
          };
        }
      }
}