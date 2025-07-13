'use client';
import { Skeleton } from '@heroui/react';

export default function LoadingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-20 size-32 rounded-full bg-purple-200 blur-xl"></div>
        <div className="absolute right-20 top-40 size-24 rounded-full bg-blue-200 blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 size-40 rounded-full bg-green-200 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 size-28 rounded-full bg-pink-200 blur-lg"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-20" />
      </header>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="w-64 space-y-4 p-6">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12 p-6">
          {/* First Media Section */}
          <div className="space-y-6 rounded-2xl bg-white/20 p-8 backdrop-blur-sm">
            <Skeleton className="h-12 w-80" />

            {/* Track Info */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-2 w-96" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-center space-x-6">
              <Skeleton className="size-8 rounded" />
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="size-8 rounded" />
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-end space-x-2">
              <Skeleton className="size-6" />
              <Skeleton className="h-2 w-24" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* View Button */}
            <div className="flex justify-end">
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          {/* Second Media Section */}
          <div className="space-y-6 rounded-2xl bg-white/20 p-8 backdrop-blur-sm">
            <Skeleton className="h-12 w-96" />

            {/* Track Info */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-2 w-96" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-center space-x-6">
              <Skeleton className="size-8 rounded" />
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="size-8 rounded" />
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-end space-x-2">
              <Skeleton className="size-6" />
              <Skeleton className="h-2 w-24" />
            </div>

            {/* View Button */}
            <div className="flex justify-end">
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </main>
      </div>

      {/* Loading notification */}
      <div className="fixed bottom-6 left-6 flex items-center space-x-2 rounded-lg bg-red-500/90 p-3 backdrop-blur-sm">
        <div className="size-2 animate-pulse rounded-full bg-white"></div>
        <span className="text-sm font-medium text-white">Loading content...</span>
      </div>
    </div>
  );
}
