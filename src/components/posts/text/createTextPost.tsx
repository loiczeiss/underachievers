"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

import { Card, Textarea, Button, Input } from "@heroui/react";

export default function CreateTextPost() {
  const [formState, action] = useFormState(actions.createTextPostAction, {
    errors: {},
  });
  return (
    <>
      <div className="flex justify-center">
        <Card
          isBlurred
          className="mx-8 lg:mx-0 lg:w-2/3 mt-8 p-8 dark:bg-black/25"
        >
          <form action={action}>
            <Input
              className="pb-4 text-sm"
              variant="bordered"
              name="title"
              classNames={{
                input: "placeholder:text-black dark:placeholder:text-zinc-300",
                inputWrapper: "border-white/20 dark:border-black/25",
              }}
              isClearable
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
              variant="bordered"
              classNames={{
                input: "placeholder:text-black dark:placeholder:text-zinc-300",
                inputWrapper: "border-white/20 dark:border-black/25",
              }}
              name="content"
              placeholder="Text content"
            />
            <input type="hidden" name="postType" value={"TEXT"} />
            <Button
              className="mt-4 lg:w-1/4 self-end bg-white/20 shadow dark:bg-black/25"
              type="submit"
            >
              Create text post
            </Button>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
          </form>
        </Card>
      </div>
    </>
  );
}
