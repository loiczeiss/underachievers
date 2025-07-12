"use client"

import { useEffect, useState } from "react"
import { Progress, Spinner, Card, CardBody } from "@heroui/react"

export default function Loading() {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState("Initializing creative space...")

    const loadingMessages = [
        "Initializing creative space...",
        "Loading your portfolio...",
        "Preparing artistic tools...",
        "Almost ready to create...",
        "Welcome to UnderAchievers!",
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100
                }
                const diff = Math.random() * 8 + 2
                const newProgress = Math.min(oldProgress + diff, 100)

                // Update loading text based on progress
                const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1))
                setLoadingText(loadingMessages[messageIndex])

                return newProgress
            })
        }, 300)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>

            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 text-center space-y-8 px-4 max-w-md mx-auto">
                {/* Logo/Brand */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                        Under<span className="text-purple-400">Achievers</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl font-light">Unleashing Creative Potential</p>
                </div>

                {/* Main loading card */}
                <Card className="bg-black/20 backdrop-blur-md border border-purple-500/20">
                    <CardBody className="space-y-6 p-8">
                        {/* NextUI Spinner */}
                        <div className="flex justify-center">
                            <Spinner
                                size="lg"
                                color="secondary"
                                classNames={{
                                    circle1: "border-b-purple-400",
                                    circle2: "border-b-violet-400",
                                }}
                            />
                        </div>

                        {/* NextUI Progress */}
                        <div className="space-y-3">
                            <Progress
                                size="md"
                                value={progress}
                                color="secondary"
                                className="max-w-md"
                                classNames={{
                                    base: "max-w-md",
                                    track: "bg-slate-700/50",
                                    indicator: "bg-gradient-to-r from-purple-400 to-violet-400",
                                }}
                            />
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">{loadingText}</span>
                                <span className="text-purple-400 font-medium">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Loading dots animation */}
                        <div className="flex justify-center space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                    </CardBody>
                </Card>

                {/* Additional info */}
                <div className="space-y-2">
                    <p className="text-slate-400 text-sm">Preparing your artistic journey</p>
                    <div className="flex justify-center space-x-4 text-xs text-slate-500">
                        <span>Drawing</span>
                        <span>•</span>
                        <span>Writing</span>
                        <span>•</span>
                        <span>Music</span>
                    </div>
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    )
}
