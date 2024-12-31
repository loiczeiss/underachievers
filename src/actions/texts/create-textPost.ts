'use server'

import type { TextPost } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";


const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
  });
  
  interface CreateTextPostFormState {
    errors: {
      title?: string[];
      content?: string[];
      _form?: string[];
    };
  }
  export async function createTextPostAction(
  
    formState: CreateTextPostFormState,
    formData: FormData
  ): Promise<CreateTextPostFormState> {
    const result = createPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }
  
    const session = await auth();
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be signed in to do this"],
        },
      };
    }
  
   
    let post: TextPost;
    try {
      post = await db.textPost.create({
        data: {
          title: result.data.title,
          content: result.data.content,
          userId: session.user.id,
       
        },
      });
    } catch (err: unknown) {
      if(err instanceof Error){
       return{
           errors: {
              _form: [err.message]
           }
       }
      }else{
          return {
              errors:{
                  _form: ['Failed to create post']
              }
          }
      }
    }
  
    revalidatePath(paths.textPostsListPage());
    redirect(paths.textPostsListPage())
    //TODO: revalidate the topic show page
  }
  