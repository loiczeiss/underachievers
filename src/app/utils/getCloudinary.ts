import { v2 as cloudinary } from 'cloudinary';

export default function getCloudinary() {
  // Config our Cloudinary instance

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  });
  return cloudinary;
}
