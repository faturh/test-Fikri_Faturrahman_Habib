"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Sidebar Container */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-72 bg-primary flex flex-col flex-shrink-0 text-white shadow-2xl z-[100] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-1 w-8 h-8">
                  <div className="bg-white/90 rounded-full w-2.5 h-2.5"></div>
                  <div className="bg-white/60 rounded-full w-2.5 h-2.5"></div>
                  <div className="bg-white/60 rounded-full w-2.5 h-2.5"></div>
                  <div className="bg-white/30 rounded-full w-2.5 h-2.5"></div>
              </div>
              <div className="flex flex-col leading-none">
                  <span className="font-bold text-sm">Solusi</span>
                  <span className="text-xs opacity-80">Teknologi</span>
                  <span className="text-xs opacity-80">Kreatif</span>
              </div>
          </div>
          <button onClick={onToggle} className="lg:hidden text-white opacity-70 hover:opacity-100">
              <span className="material-icons-round text-xl">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-3 focus:outline-none">
          <NavItem icon="folder" label="Systems" />
          <NavItem icon="grid_view" label="System Code" />
          <NavItem icon="dashboard" label="Properties" />
          <NavItem icon="list_alt" label="Menus" active />
          <NavItem icon="api" label="API List" />
          
          <div className="pt-4 pb-2">
              <div className="h-px bg-white/20 mx-4"></div>
          </div>
          
          <NavItem icon="folder_shared" label="Users & Group" />
          <NavItem icon="folder_special" label="Competition" />
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[90] lg:hidden animate-in fade-in duration-300"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
        active
          ? "bg-white text-primary shadow-lg"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="material-icons-round">{icon}</span>
      <span className={cn("font-medium", active ? "font-bold" : "")}>{label}</span>
    </a>
  );
};

export default Sidebar;
