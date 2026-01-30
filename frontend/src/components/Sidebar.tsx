import React from 'react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-primary flex flex-col flex-shrink-0 text-white shadow-xl z-20 rounded-r-2xl lg:rounded-none relative">
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
        <button className="text-white opacity-70 hover:opacity-100">
            <span className="material-icons-round text-xl">menu_open</span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-3">
        {/* Navigation Items */}
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
  );
};

const NavItem = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
        active
          ? "bg-primary-foreground bg-white text-primary shadow-lg"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="material-icons-round">{icon}</span>
      <span className={cn("font-medium", active ? "font-bold" : "")}>{label}</span>
    </a>
  );
};

export default Sidebar;
