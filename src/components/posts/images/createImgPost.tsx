"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function CreateImgPost() {
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const CloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const [formState, action] = useFormState(actions.createImgPostAction, {
    errors: {},
  });

  const handleUploadSuccess = async (result) => {
    try {
      // Call the upload handler
      const response = (await actions.uploadImg(result)) as {
        url: string;
        publicId: string;
      };

      if (response?.url && response?.publicId) {
        setUploadedImage(response); // Set the image data in state
      } else {
        console.error("Failed to retrieve the uploaded image data.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const handleDeletingImg = async () => {
    if (!uploadedImage) return;

    try {
      await actions.deleteImg(uploadedImage.publicId); // Pass publicId for deletion
      setUploadedImage(null); // Reset state
    } catch (error) {
      console.error("Error during image deletion:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (uploadedImage) {
        await handleDeletingImg();
        // Show a confirmation dialog in case of accidental navigation
        event.preventDefault();
        event.returnValue = ""; // Some browsers require this for showing the dialog
      }
    };

    // Attach event listener for page unload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Ensure cleanup logic also runs
      handleDeletingImg();
    };
  }, [uploadedImage]);

  return (
    <>
      <Card isBlurred className="mx-8 lg:mx-0 lg:w-2/3 my-8 p-8">
        <h1 className="pb-4">
          Give your post a title, image and a short description
        </h1>
        <form action={action}>
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
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(", ")}
          />
          {!uploadedImage && (
            <div>
              <CldUploadButton
                uploadPreset={CloudPresetName}
                options={{ sources: ["local", "url", "camera"] }}
                className={`${
                  formState.errors.imgUrl
                    ? "border-rose-500"
                    : "border-white/25"
                } rounded-xl border p-4`}
                onSuccess={handleUploadSuccess}
              />
              <p className="text-rose-500 text-[12px] mb-4">
                {formState.errors.imgUrl}
              </p>
            </div>
          )}
          {uploadedImage && (
            <div className="flex flex-col mb-4 lg:flex-row lg:mb-0">
              <CldImage
                className="rounded-xl mb-4"
                width={300}
                height={200}
                src={uploadedImage.url}
                sizes="100vw"
                alt="Uploaded Image"
              />
              <Button
                variant="bordered"
                className="border-white/25 lg:self-center lg:ml-4"
                onClick={handleDeletingImg}
              >
                Delete Image
              </Button>
            </div>
          )}
          <Input type="hidden" name="imgUrl" value={uploadedImage?.url || ""} />
          <Input
            type="hidden"
            name="imgPublicId"
            value={uploadedImage?.publicId || ""}
          />
          <Textarea
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(", ")}
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
            Create image post
          </Button>
          {formState.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState.errors._form.join(", ")}
            </div>
          ) : null}
        </form>
      </Card>
    </>
  );
}
