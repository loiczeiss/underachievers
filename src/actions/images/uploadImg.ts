"use server";

import { db } from "@/db";
import { Image } from "@prisma/client";


interface ResultProps {
  info: {
    public_id: string;
    secure_url: string;
    height: number;
    format: string;
    width: number
  }
}
export async function uploadImg(result: ResultProps) {
  

  try {
   await db.image.create({
      data: {
        publicId: result.info.public_id,
        url: result.info.secure_url,
        width: result.info.width,
        height: result.info.height,
        format: result.info.format,
      },
    });
    return {
      url: result.info.secure_url,
      publicId: result.info.public_id,
    };

}catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Database error:", err);
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    console.error("Unexpected error:", err);
    return {
      errors: {
        _form: ["Failed to create post"],
      },
    };
  }

}

