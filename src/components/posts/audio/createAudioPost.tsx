"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "@/app/index.scss"

export default function CreateAudioPost() {
  const [uploadedAudio, setUploadedAudio] = useState<{
    url: string;
    publicId: string;
    duration: number;
    format: string;
    displayName: string;
    playbackUrl: string;
    thumbnailUrl: string;
  } | null>(null);
  const CloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const [formState, action] = useFormState(actions.createAudioPostAction, {
    errors: {},
  });
  const Player = () => (
    <AudioPlayer  
    header={`${uploadedAudio?.displayName} `}
    className="mb-4"
      autoPlay={false}
      src={uploadedAudio?.url}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  );
console.log(formState?.errors?._form?.join(", "))
  const handleUploadSuccess = async (result) => {
    try {
      // Call the upload handler
      const response = (await actions.uploadAudio(result)) as {
        url: string;
        publicId: string;
        duration: number;
        format: string;
        displayName: string;
        playbackUrl: string;
        thumbnailUrl: string;
      };

      if (response?.url && response?.publicId) {
        setUploadedAudio(response); // Set the image data in state
        console.log(uploadedAudio);
      } else {
        console.error("Failed to retrieve the uploaded image data.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <>
      <Card isBlurred className="mx-8 lg:mx-0 lg:w-2/3 my-8 p-8">
        <h1 className="pb-4">
          Give your post a title and a short description and upload an audio
          file.
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
        {!uploadedAudio && (
          <div>
            <CldUploadButton
              uploadPreset={CloudPresetName}
              options={{ sources: ["local", "url"] }}
              className={`rounded-xl  p-4  bg-white/25 hover:bg-white/50
                ${
                formState.errors.audioUrl
                  ? "border-rose-500"
                  : "border-white/25"
              } rounded-xl border p-4`}
       
              onSuccess={handleUploadSuccess}
            />
            <p className="text-rose-500 text-[12px] mb-4">
              {formState.errors.audioUrl}
            </p>
          </div>
        )}
      
        {uploadedAudio && <Player />}

        <Input type="hidden" name="audioUrl" value={uploadedAudio?.url || ""} />
          <Input
            type="hidden"
            name="audioPublicId"
            value={uploadedAudio?.publicId || ""}
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
          className="mt-4 lg:w-1/4 self-end bg-white/20 shadow hover:bg-white/50"
          type="submit"
        >
          Create audio post
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
