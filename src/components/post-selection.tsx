import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { PlusCircle } from './plusCircleIcon';
import { useRouter } from 'next/navigation';
import paths from '@/paths';
import { useEffect, useState } from 'react';
export default function PostSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  }

  const isMobile = useMediaQuery('(max-width: 768px)'); // Change based on your breakpoint

  const placement = isMobile ? 'bottom' : 'left'; // Adjust placement based on screen size

  const handlePostTypeSelection = (postType: string) => {
    if (postType === 'text') {
      router.push(paths.createTextPost());
    } else if (postType === 'image') {
      router.push(paths.createImgPost());
    } else if (postType === 'sound') {
      router.push(paths.createAudioPost());
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
        <Button aria-label="new post" isIconOnly className="rounded-3xl " variant="ghost">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-4 bg-white/25 p-4 shadow backdrop-blur-sm md:bg-transparent dark:bg-black/25">
        <div>
          <h2 className="dark:text-zinc-200">What kind of post do you want to create ?</h2>
          <div className="flex flex-col p-4">
            <Button
              aria-label="Text post creation"
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff] dark:bg-black/25"
              onPress={() => handlePostTypeSelection('text')}
            >
              Text
            </Button>
            <Button
              aria-label="Image post creation"
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff] dark:bg-black/25"
              onPress={() => handlePostTypeSelection('image')}
            >
              Image
            </Button>
            <Button
              aria-label="Sound post creation"
              className="mt-4 bg-transparent shadow hover:bg-[#f2faff] dark:bg-black/25"
              onPress={() => handlePostTypeSelection('sound')}
            >
              Sound
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
