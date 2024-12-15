"use client"

import { deleteImgPost } from "@/actions";
import { Button, Card } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";

interface ImgPost {
    title: string;
    content: string;
    imgUrl: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date

}


interface ImgPostShowProps{
    post: ImgPost; deleteImgPost?:  (formData: FormData) => void | Promise<void>
}

export default function ImgPostShow({ post, deleteImgPost }: ImgPostShowProps){
    return(
        <Card isBlurred className="mt-8 w-1/2 px-8">
             
          <h1 className="my-4 text-xl uppercase">{post.title}</h1>
          <CldImage
                className="rounded-xl mb-4 "
                width={300} // Adjust width as needed
                height={200} // Adjust height as needed
                src={post.imgUrl}
                sizes="100vw"
                alt="Uploaded Image"
              />
          <p className="mb-8">{post.content}</p>
          <form action={deleteImgPost}>
            <Button className="w-48 mb-4 border-white/25" variant="bordered" type="submit">
              Delete the post
            </Button>
          </form>
        </Card>
      );
}