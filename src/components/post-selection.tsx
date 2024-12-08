import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { PlusCircle } from "./plusCircleIcon";
import { redirect } from "next/navigation";
import paths from "@/paths";
export default function PostSelection() {
  return (
    <Popover placement="left" className="mr-8">
      <PopoverTrigger>
        <Button isIconOnly className="rounded-3xl" variant="ghost" ><PlusCircle/></Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-transparent shadow backdrop-blur-sm mt-4">
        <div>
          <h2>What kind of post do you want to create ?</h2>
          <div className="flex flex-col p-4">
            <Button
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff]"
              onClick={() => redirect(paths.createTextPost())}
            >
              Text
            </Button>
            <Button className="mt-4 bg-transparent shadow hover:bg-[#f2faff]">
              Image
            </Button>
            <Button className="mt-4 bg-transparent shadow hover:bg-[#f2faff]">
              Sound
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
