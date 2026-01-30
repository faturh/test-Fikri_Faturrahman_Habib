"use client";

import React, { useState } from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { Providers } from './Providers';
import Toast from '@/components/common/Toast';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="bg-[#f8fafc] h-screen flex overflow-hidden text-slate-800 transition-colors duration-200 font-sans">
        <Providers>
            <Toast />
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        <span className="material-icons-round">menu</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                             <span className="material-icons-round text-sm">grid_view</span>
                        </div>
                        <span className="font-bold text-sm">Menus</span>
                    </div>
                    <div className="w-8"></div> {/* Spacer */}
                </header>

                <div className="flex-1 overflow-auto relative">
                    {children}
                </div>
            </main>
        </Providers>
      </body>
    </html>
  );
}
