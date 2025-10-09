import Header from '@/shared/components/layout/Header';
import SecondaryNavigation from '@/shared/components/layout/SecondaryNavigation';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bazara - Team Management',
  description: 'Team Management System for Bazara',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased bg-secondary-background`}>
        {/* Skip Links */}
        <div className='sr-only focus-within:not-sr-only'>
          <a
            href='#main-content'
            className='absolute top-4 left-4 z-[100] bg-bazara-blue text-background px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-bazara-blue-light'
          >
            Skip to main content
          </a>
          <a
            href='#main-navigation'
            className='absolute top-4 left-32 z-[100] bg-bazara-blue text-background px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-bazara-blue-light'
          >
            Skip to navigation
          </a>
        </div>

        <div className='min-h-screen flex flex-col'>
          <Header />
          <SecondaryNavigation />
          <main id='main-content' className='flex-1' role='main' aria-label='Main content'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
