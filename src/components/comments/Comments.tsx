"use client";
import { Button, Card, Textarea } from "@nextui-org/react";

export default function Comments() {
  return (
    <>
      <Card isBlurred className="mb-4">
        <h1 className="m-4">Comments</h1>
        <form action="">
        <Textarea
                //   isInvalid={!!formState.errors.content}
                //   errorMessage={formState.errors.content?.join(", ")}
              variant="bordered"
              isClearable
              classNames={{
                input: "placeholder:text-black",
                inputWrapper: ["border-white/25","hover:border-black", "focus-within:!border-white/50"],
                base: "border-gray-800"
              }}
       
               name="content"
      
              placeholder="Comment content"
            />
          <Button className="w-48 bg-white/50">Add a comment</Button>
        </form>
      </Card>
    </>
  );
}
