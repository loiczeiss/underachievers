import CreateImgPost from "@/components/posts/images/createImgPost";
import getCloudinary from "@/app/utils/getCloudinary";
import { db } from "@/db";

// Cloudinary client

const cloudinary = getCloudinary();
export default async function CreateImgPage(){




    return(<><div className="flex justify-center">
        <CreateImgPost />
        </div></>)
}