'use client';

import { addToast, Button, Card, Input, Textarea } from '@heroui/react';
import * as actions from '@/actions';

import { useActionState, useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '@/app/index.scss';

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
  const [formState, action] = useActionState(actions.createAudioPostAction, {
    errors: {},
  });
  const Player = () => (
    <AudioPlayer
      header={`${uploadedAudio?.displayName} `}
      className="mb-2"
      autoPlay={false}
      src={uploadedAudio?.url}
    />
  );

  const handleUploadSuccess = async (result: any) => {
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
      } else {
        addToast({ title: 'Failed to retrieve the uploaded audio data.', color: 'danger' });
      }
    } catch {
      addToast({ title: 'Error during upload', color: 'danger' });
    }
  };

  const handleDeletingAudio = async () => {
    if (!uploadedAudio) return;

    try {
      await actions.deleteAudio(uploadedAudio.publicId); // Pass publicId for deletion
      setUploadedAudio(null); // Reset state
      addToast({ title: 'Audio deleted successfully.', color: 'success' });
    } catch {
      addToast({ title: 'Error deleting audio data.', color: 'danger' });
    }
  };
  useEffect(() => {
    const handleBeforeUnload = async (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (uploadedAudio) {
        await handleDeletingAudio();
        // Show a confirmation dialog in case of accidental navigation
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this for showing the dialog
      }
    };

    // Attach event listener for page unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Ensure cleanup logic also runs
    };
  }, [uploadedAudio]);

  return (
    <>
      <Card isBlurred className="m-8 p-8 lg:mx-0 lg:w-2/3 dark:bg-black/25 dark:text-zinc-300">
        <h1 className="pb-4">
          Give your post a title and a short description and upload an audio file.
        </h1>
        <form action={action}>
          <Input
            className="pb-4"
            variant="bordered"
            name="title"
            classNames={{
              input: 'placeholder:text-black dark:placeholder:text-zinc-300',
              inputWrapper: 'border-white/20 dark:border-black/25',
            }}
            isClearable
            placeholder="Title"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
          />
          {!uploadedAudio && (
            <div>
              <CldUploadButton
                uploadPreset={CloudPresetName}
                options={{ sources: ['local', 'url'] }}
                className={`rounded-xl  bg-white/25  p-4 hover:bg-white/50 dark:bg-black/25 dark:hover:bg-black/75
                ${
                  formState.errors.audioUrl ? 'border-rose-500' : 'border-white/25'
                } rounded-xl border p-4`}
                onSuccess={handleUploadSuccess}
              />
              <p className="mb-4 text-[12px] text-rose-500">{formState.errors.audioUrl}</p>
            </div>
          )}

          {uploadedAudio && (
            <>
              <Player />{' '}
              <Button
                name="Delete Audio"
                className="mb-4 bg-red-400 "
                onPress={handleDeletingAudio}
              >
                Delete Audio
              </Button>
            </>
          )}

          <Input type="hidden" name="audioUrl" value={uploadedAudio?.url || ''} />
          <Input type="hidden" name="audioPublicId" value={uploadedAudio?.publicId || ''} />
          <Input type="hidden" name="postType" value={'AUDIO'} />
          <Textarea
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(', ')}
            variant="bordered"
            classNames={{
              input: 'placeholder:text-black dark:placeholder:text-zinc-300',
              inputWrapper: 'border-white/20 dark:border-black/25',
            }}
            name="content"
            placeholder="Content"
          />
          <Button
            id="Create"
            className="mt-4 self-end bg-white/20 shadow hover:bg-white/50 lg:w-1/4 dark:bg-black/25 dark:hover:bg-black/75 "
            type="submit"
          >
            Create
          </Button>
          {formState.errors._form ? (
            <div className="rounded border border-red-400 bg-red-200 p-2">
              {formState.errors._form.join(', ')}
            </div>
          ) : null}
        </form>
      </Card>
    </>
  );
}
