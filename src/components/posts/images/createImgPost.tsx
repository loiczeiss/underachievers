"use client";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function CreateImgPost() {

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const CloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  const handleUploadSuccess = async (result) => {
    try {
      // Call the upload handler
      const url = await actions.uploadImg(result); // Ensure `uploadImg` returns the URL
      if (url) {
        setUploadedImageUrl(url); // Set the image URL in state
      } else {
        console.error("Failed to retrieve the uploaded image URL.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };
  return (
    <>
      <Card isBlurred className="mx-8 lg:mx-0 lg:w-2/3 my-8 p-8 ">
      <h1 className="pb-4">Give your post a title, image and a short description</h1>
        <form>
          <Input
            className="pb-4"
            variant="bordered"
            name="title"
           
            classNames={{
              input: "placeholder:text-black",
              inputWrapper: "border-white/20",
            }}
            isClearable
            placeholder="Title"
            //   isInvalid={!!formState.errors.title}
            //   errorMessage={formState.errors.title?.join(', ')}
          />
          <CldUploadButton
            uploadPreset={CloudPresetName}
            options={{ sources: ["local", "url", "camera"] }}
            className="rounded-xl border border-white/25 p-4 mb-4"
            onSuccess={handleUploadSuccess}
          />
            {uploadedImageUrl && (
          <div className="flex flex-col mb-4 lg:flex-row lg:mb-0"><CldImage
          className="rounded-xl mb-4 "
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          src={uploadedImageUrl}
          sizes="100vw"
          alt="Uploaded Image"
        /> <Button variant="bordered"  className='border-white/25 lg:self-center lg:ml-4' onClick={()=>setUploadedImageUrl(null)}>delete pic</Button></div>
        )}
          <Textarea
            //   isInvalid={!!formState.errors.content}
            //   errorMessage={formState.errors.content?.join(", ")}
            variant="bordered"
            classNames={{
              input: "placeholder:text-black",
              inputWrapper: "border-white/20",
            }}
            name="content"
            
            placeholder="Content"
          />
          <Button
            className="mt-4 lg:w-1/4 self-end bg-white/20 shadow"
            type="submit"
          >
            Create text post
          </Button>
          {/* {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">{formState.errors._form.join(", ")}</div>
            ) : null} */}
        </form>
      </Card>
    </>
  );
}
