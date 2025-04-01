
"use client";

import { Button } from "@heroui/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  function switchTheme(theme: string){
    if (theme === "light"){
        setTheme('dark')
    }else{
        setTheme('light')
    }
  }

  return (
    <div className="flex fixed bottom-0 px-4 py-4">

      <Button id="light/dark mode" className={`${theme === "light" ?"bg-white/25" : "bg-black/25"} ${theme === "light" ?"text-black" : "text-white"} hover:bg-white/75 mr-4 dark:hover:bg-black/75 `} onPress={() => switchTheme(theme as string)}>{`${theme === 'light'? "Dark Mode":"Light Mode"}`}</Button>
  
    </div>
  )
};