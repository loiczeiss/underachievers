'use client';

import { addToast, Button, Card, Input, Textarea } from '@heroui/react';
import { CldUploadButton, CldImage } from 'next-cloudinary';
import * as actions from '@/actions';

import { useActionState, useEffect, useState } from 'react';

export default function CreateImgPost() {
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const CloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const [formState, action] = useActionState(actions.createImgPostAction, {
    errors: {},
  });

  const handleUploadSuccess = async (result: any) => {
    try {
      // Call the upload handler
      const response = (await actions.uploadImg(result)) as {
        url: string;
        publicId: string;
      };

      if (response?.url && response?.publicId) {
        setUploadedImage(response); // Set the image data in state
      } else {
        console.error('Failed to retrieve the uploaded image data.');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const handleDeletingImg = async () => {
    if (!uploadedImage) return;

    try {
      addToast({
        title: 'Deleting image...',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      await actions.deleteImg(uploadedImage.publicId); // Pass publicId for deletion
      setUploadedImage(null); // Reset state
      addToast({ title: 'Image deleted successfully', color: 'success' });
    } catch (error) {
      addToast({ title: `Error during image deletion: ${error}`, color: 'danger' });
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
  }, [uploadedImage]);

  return (
    <>
      <Card isBlurred className="m-8 p-8 lg:mx-0 lg:w-2/3 dark:bg-black/25 dark:text-zinc-300">
        <h1 className="pb-4">Give your post a title, image and a short description</h1>
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
          {!uploadedImage && (
            <div>
              <CldUploadButton
                uploadPreset={CloudPresetName}
                options={{ sources: ['local', 'url', 'camera'] }}
                className={`${
                  formState.errors.imgUrl ? 'border-rose-500' : 'border-white/25'
                } dark-text-zinc-300 rounded-xl border p-4 dark:border-black/25`}
                onSuccess={handleUploadSuccess}
              />
              <p className="mb-4 text-[12px] text-rose-500">{formState.errors.imgUrl}</p>
            </div>
          )}
          {uploadedImage && (
            <div className="mb-4 flex flex-col lg:mb-0 lg:flex-row">
              <CldImage
                className="mb-4 rounded-xl"
                width={300}
                height={200}
                src={uploadedImage.url}
                sizes="100vw"
                alt="Uploaded Image"
              />
              <Button
                id="Delete"
                variant="bordered"
                className="border-white/25 lg:ml-4 lg:self-center dark:border-black/25 dark:text-zinc-300"
                onPress={handleDeletingImg}
              >
                Delete Image
              </Button>
            </div>
          )}
          <Input type="hidden" name="imgUrl" value={uploadedImage?.url || ''} />
          <Input type="hidden" name="imgPublicId" value={uploadedImage?.publicId || ''} />
          <input type="hidden" name="postType" value={'IMAGE'} />
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
            className="mt-4 self-end bg-white/20 shadow lg:w-1/4  dark:bg-black/25 dark:text-zinc-300 dark:hover:bg-black/75"
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
