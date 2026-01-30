"use client";

import React, { useEffect } from 'react';
import MenuTree from '@/components/menu/MenuTree';
import MenuForm from '@/components/menu/MenuForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMenus, selectItem, addMenu, MenuItem } from '@/store/menusSlice';

export default function Home() {
    const dispatch = useAppDispatch();
    const { items, selectedItem, loading, error } = useAppSelector((state) => state.menus);

    useEffect(() => {
        dispatch(fetchMenus());
    }, [dispatch]);

    const handleSelect = (item: MenuItem) => {
        dispatch(selectItem(item));
    };

    const handleExpandAll = () => {
        // Implement logic or dispatch action if state is managed globally
    };

    const handleCollapseAll = () => {
         // Implement logic
    };

  return (
    <div className="h-full flex flex-col">
       <header className="p-8 pb-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="material-icons-round text-gray-400 dark:text-gray-500 text-base">folder</span>
                <span>/</span>
                <span>Menus</span>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <span className="material-icons-round text-2xl">grid_view</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menus</h1>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Menu</label>
                <div className="relative w-full max-w-md">
                    <select className="block w-full pl-4 pr-10 py-3 text-base border-none rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                        <option>system management</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <span className="material-icons-round">expand_more</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button 
                    onClick={() => dispatch(addMenu({ name: "New Menu", depth: 0 }))}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full shadow-lg transition-colors flex items-center gap-2"
                >
                    <span className="material-icons-round text-sm">add</span>
                    Add Item
                </button>
                <button 
                    onClick={handleExpandAll}
                    className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white text-sm font-medium rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                >
                    Expand All
                </button>
                <button 
                    onClick={handleCollapseAll}
                    className="px-6 py-2 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Collapse All
                </button>
            </div>
       </header>
       
       <div className="flex-1 overflow-hidden px-8 pb-8">
           <div className="h-full flex flex-col lg:flex-row bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                {/* Left Column: Tree */}
                <div className="flex-1 overflow-y-auto p-6 border-r border-gray-100 dark:border-gray-800 lg:w-7/12">
                     {loading ? (
                         <div className="flex justify-center items-center h-full text-gray-400">Loading...</div>
                     ) : error ? (
                         <div className="text-red-500">{error}</div>
                     ) : (
                         <MenuTree 
                            items={items} 
                            onSelect={handleSelect}
                            selectedId={selectedItem?.id}
                         />
                     )}
                </div>

                {/* Right Column: details */}
                <div className="lg:w-5/12 p-6 overflow-y-auto bg-white dark:bg-background-dark">
                    <MenuForm selectedItem={selectedItem} />
                </div>
           </div>
       </div>
    </div>
  );
}
