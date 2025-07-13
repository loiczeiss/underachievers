'use client';
import { redirect } from 'next/navigation';
import HeaderAuth from './Header-auth';
import paths from '@/paths';
import { Button } from '@heroui/react';

export default function Header() {
  return (
    <>
      <header className="flex h-28 flex-row shadow-md backdrop-blur-sm dark:bg-black/50">
        <section className="flex items-center px-8 py-4 lg:w-1/2">
          <Button
            aria-label="HomePage Button"
            className="bg-transparent  p-0 text-xs hover:text-gray-300 md:text-base lg:text-3xl dark:text-zinc-300 "
            onPress={() => redirect(paths.home())}
          >
            UnderAchievers
          </Button>
        </section>
        <section className="flex w-1/2 items-center justify-end px-8">
          <HeaderAuth />
        </section>
      </header>
    </>
  );
}
