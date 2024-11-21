"use client";
import { Button, Card, Input, Textarea } from "@nextui-org/react";

export default function CreateText() {
  return (
    <div className="flex justify-center">
      <Card isBlurred className="w-2/3 mt-8 p-8 ">
        <Input className="pb-4" variant="bordered" classNames={{input:"placeholder:text-black", inputWrapper:"border-white/20"}}  isClearable placeholder="Title"  />
        <Textarea variant="bordered" classNames={{input:"placeholder:text-black", inputWrapper:"border-white/20"}} placeholder="Text content" />
        <Button className="mt-4 w-1/4 self-end bg-white/20 shadow">Create text post</Button>
      </Card>
    </div>
  );
}
