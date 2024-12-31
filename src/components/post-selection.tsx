import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { PlusCircle } from "./plusCircleIcon";
import { useRouter } from "next/navigation";
import paths from "@/paths";
import { useEffect, useState } from "react";
export default function PostSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}


const isMobile = useMediaQuery("(max-width: 768px)"); // Change based on your breakpoint

  const placement = isMobile ? "bottom" : "left"; // Adjust placement based on screen size


  const handlePostTypeSelection = (postType: string) => {
    if (postType === "text") {
      router.push(paths.createTextPost());
    } else if (postType === "image") {
      router.push(paths.createImgPost());
    } else if (postType === "sound") {
      router.push(paths.createAudioPost())
    }
    setIsOpen(false);
  };
  return (
    <Popover
      placement={placement}
      className="mr-8"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly className="rounded-3xl " variant="ghost">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-transparent shadow backdrop-blur-sm mt-4">
        <div>
          <h2>What kind of post do you want to create ?</h2>
          <div className="flex flex-col p-4">
            <Button
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff]"
              onPress={() => handlePostTypeSelection("text")}
            >
              Text
            </Button>
            <Button
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff]"
              onPress={() => handlePostTypeSelection("image")}
            >
              Image
            </Button>
            <Button
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff]"
              onPress={() => handlePostTypeSelection("sound")}
            >
              Sound
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
