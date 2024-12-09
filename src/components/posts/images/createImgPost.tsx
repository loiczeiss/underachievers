"use client";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import * as actions from "@/actions"
import { useFormState } from "react-dom";
export default function CreateImgPost() {
  
  const CloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
const uploadHandler = actions.uploadImg
  return (
    <>
      <Card isBlurred className="w-2/3 mt-8 p-8 ">
        <form>
          <Input
            className="pb-4"
            variant="bordered"
            name="title"
            label="title"
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
            options={{ multiple: true, sources: ["local", "url", "camera"] }}
            className="w-64 h-84"
            onSuccess={(result)=>uploadHandler(result)}
          />
          {/* <CldImage
            width="960"
            height="600"
            src="<Public ID>"
            sizes="100vw"
            alt="Description of my image"
          /> */}
          <Textarea
            //   isInvalid={!!formState.errors.content}
            //   errorMessage={formState.errors.content?.join(", ")}
            variant="bordered"
            classNames={{
              input: "placeholder:text-black",
              inputWrapper: "border-white/20",
            }}
            name="content"
            label="Content"
            placeholder="Text content"
          />
          <Button
            className="mt-4 w-1/4 self-end bg-white/20 shadow"
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
