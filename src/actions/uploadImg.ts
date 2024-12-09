"use server";

import { db } from "@/db";
import paths from "@/paths";
import { Image } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    console.log(result)
  let img: Image;
  try {
    img = await db.image.create({
      data: {
        publicId: result.info.public_id,
        url: result.info.secure_url,
        width: result.info.width,
        height: result.info.height,
        format: result.info.format,
      },
    });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//         console.log("here")
//       return {
//         errors: {
//           _form: [err.message],
//         },
//       };
//     } else {
//         console.log("here2")
//       return {
//         errors: {
//           _form: ["Failed to create post"],
//         },
//       };
//     }
//   }

//   //   revalidatePath(paths.postsListPage());
//   //   redirect(paths.postsListPage());
//   //TODO: revalidate the topic show page
// }
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

