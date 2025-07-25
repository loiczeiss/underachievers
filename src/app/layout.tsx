import type { Metadata } from 'next';
import { Providers } from './providers';
import { Zen_Dots } from 'next/font/google';
import './globals.css';
import Header from '../components/header/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Head from 'next/head';
import { generateMeta } from '@/lib/metadata'; // Import Head

const zenDots = Zen_Dots({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = generateMeta({
  title: 'Home | UnderAchievers',
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
      <link rel="preload" href="./globals.css" as="style" />
      {/* Preload main.css */}
    </Head>
    <body className={`${zenDots.className} antialiased`}>
    <div className="h-full w-screen overflow-scroll">
      <Providers>
        <Header />
        {children}
        <ThemeSwitcher />
        <Analytics />
        <SpeedInsights />
      </Providers>
    </div>
    </body>
    </html>
  );
}
