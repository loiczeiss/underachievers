"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

import { Card, Textarea, Button, Input } from "@heroui/react";
import { useState } from "react";

export default function CreateTextPost() {
  const [formState, action] = useFormState(actions.createTextPostAction, {
    errors: {},
  });
  const [ContentValue, setContentValue] = useState("");
  const [TitleValue, setTitleValue] = useState("");
  const titleErrors = [];
  if (TitleValue.length < 3 && TitleValue.length > 0) {
    titleErrors.push("Title must be at least 3 characters");
  }
  const errors = [];
  if (ContentValue.length < 10 && ContentValue.length > 0) {
    errors.push("Content must be at least 10 characters");
  }
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
              value={TitleValue}
              isInvalid={TitleValue.length < 3 && TitleValue.length > 0}
              onValueChange={setTitleValue}
              name="title"
              classNames={{
                input:
                  "placeholder:text-black dark:placeholder:text-zinc-300 dark:text-zinc-300",
                inputWrapper: "border-white/20 dark:border-black/25",
              }}
              isClearable
              placeholder="Title"
              errorMessage={titleErrors.length !== 0 ? titleErrors : null}
            />
            <Textarea
              isClearable
               errorMessage={errors.length !== 0 ? errors : null}
              value={ContentValue}
              isInvalid={ContentValue.length < 10 && ContentValue.length > 0}
              onValueChange={setContentValue}
              variant="bordered"
              classNames={{
                input:
                  "placeholder:text-black dark:placeholder:text-zinc-300 dark:text-zinc-300",
                inputWrapper: "border-white/20 dark:border-black/25",
              }}
              name="content"
              placeholder="Text content"
            />
            <input type="hidden" name="postType" value={"TEXT"} />
            <Button
            name="Create"
              className="mt-4 lg:w-1/4 self-end bg-white/20 shadow dark:bg-black/25"
              type="submit"
              isDisabled={TitleValue.length >= 3 && ContentValue.length >= 10? false :true}
            >
              Create
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
