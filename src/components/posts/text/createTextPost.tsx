"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

import { Card, Textarea, Button, Input } from "@nextui-org/react";

export default function CreateTextPost() {
  const [formState, action] = useFormState(actions.createPost,{ errors:{}})
  return (
    <>
      <div className="flex justify-center">
        <Card isBlurred className="mx-8 lg:mx-0 lg:w-2/3 mt-8 p-8 ">
          <form action={action}>
            <Input
              className="pb-4 text-sm"
              variant="bordered"
               name="title"


              classNames={{
                input: "placeholder:text-black ",
                inputWrapper: "border-white/20",
              }}
              isClearable
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
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
      
              placeholder="Text content"
            />
            <Button className="mt-4 lg:w-1/4 self-end bg-white/20 shadow" type="submit">
              Create text post
            </Button>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">{formState.errors._form.join(", ")}</div>
            ) : null}
          </form>
        </Card>
      </div>
    </>
  );
}
