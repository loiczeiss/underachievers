import type { Metadata } from "next";
import { Providers } from "./providers";
import {Zen_Dots} from "next/font/google"
import "./globals.css";
import Header from "../components/header/Header";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';


const zenDots = Zen_Dots({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "UnderAchievers",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zenDots.className} antialiased `}
      >
        {" "}
        <div className="w-screen h-full overflow-scroll ">
          <Providers>
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
          </Providers>
        </div>
      </body>
    </html>
  );
}
