import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'System Menu Management Dashboard',
  description: 'Menu Management Dashboard',
};

import { Providers } from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark h-screen flex overflow-hidden text-slate-800 dark:text-slate-100 transition-colors duration-200 font-sans">
        <Providers>
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark transition-colors duration-200">
            {children}
            </main>
        </Providers>
      </body>
    </html>
  );
}
