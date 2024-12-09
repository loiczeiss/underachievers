import CreateImgPost from "@/components/posts/images/createImgPost";
import getCloudinary from "@/app/utils/getCloudinary";

// Cloudinary client

const cloudinary = getCloudinary();
export default function CreateImgPage(){



    return(<><div className="flex justify-center">
        <CreateImgPost/>
        </div></>)
}