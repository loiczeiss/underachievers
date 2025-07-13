'use client'
import { Skeleton} from "@heroui/react";


export default function LoadingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full blur-lg"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-200 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-200 rounded-full blur-lg"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center p-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-20" />
            </header>

            <div className="flex relative z-10">
                {/* Sidebar */}
                <aside className="w-64 p-6 space-y-4">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 space-y-12">
                    {/* First Media Section */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 space-y-6">
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
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center justify-end space-x-2">
                            <Skeleton className="h-6 w-6" />
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
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 space-y-6">
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
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center justify-end space-x-2">
                            <Skeleton className="h-6 w-6" />
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
            <div className="fixed bottom-6 left-6 bg-red-500/90 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Loading content...</span>
            </div>
        </div>
    )
}
