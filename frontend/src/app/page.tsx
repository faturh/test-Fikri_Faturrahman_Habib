"use client";

import React, { useEffect, useState } from 'react';
import MenuTree from '@/components/menu/MenuTree';
import MenuForm from '@/components/menu/MenuForm';
import Modal from '@/components/common/Modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMenus, selectItem, addMenu, MenuItem, expandAll, collapseAll } from '@/store/menusSlice';

export default function Home() {
    const dispatch = useAppDispatch();
    const { items, selectedItem, loading, error } = useAppSelector((state) => state.menus);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredItems = React.useMemo(() => {
        if (!searchTerm) return items;
        
        const filterTree = (nodes: MenuItem[]): MenuItem[] => {
            return nodes
                .map(node => ({
                    ...node,
                    children: node.children ? filterTree(node.children) : []
                }))
                .filter(node => 
                    node.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    (node.children && node.children.length > 0)
                );
        };
        
        return filterTree(items);
    }, [items, searchTerm]);

    useEffect(() => {
        dispatch(fetchMenus());
    }, [dispatch]);

    const handleSelect = (item: MenuItem) => {
        dispatch(selectItem(item));
        // On mobile, maybe scroll down to the form?
        if (window.innerWidth < 1024) {
            const formElement = document.getElementById('menu-details-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleExpandAll = () => {
        dispatch(expandAll());
    };

    const handleCollapseAll = () => {
        dispatch(collapseAll());
    };

    const handleAddItem = () => {
        dispatch(addMenu({ name: "New Menu", depth: 0 }));
    };

  return (
    <div className="min-h-full flex flex-col">
       <header className="px-4 py-6 lg:p-8 lg:pb-0">
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span className="material-icons-round text-gray-400 text-base">folder</span>
                <span>/</span>
                <span>Menus</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
                    <span className="material-icons-round text-xl lg:text-2xl">grid_view</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Menus</h1>
            </div>

            <div className="mb-6 space-y-4">
                <div className="max-w-md">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Menu</label>
                    <div className="relative w-full">
                        <select className="block w-full pl-4 pr-10 py-3 text-base border-none rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                            <option>system management</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <span className="material-icons-round">expand_more</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-md">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                            <span className="material-icons-round text-lg">search</span>
                        </span>
                        <input 
                            type="text"
                            placeholder="Search menus..."
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6">
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-icons-round text-sm">add</span>
                    Add Item
                </button>
                <button 
                    onClick={handleExpandAll}
                    className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-full shadow-lg hover:bg-slate-700 transition-colors"
                >
                    Expand All
                </button>
                <button 
                    onClick={handleCollapseAll}
                    className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 bg-white text-slate-700 border border-gray-200 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors"
                >
                    Collapse All
                </button>
            </div>
       </header>
       
       <div className="flex-1 px-4 lg:px-8 pb-8">
           <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Left Column: Tree */}
                <div className="flex-1 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[400px]">
                     {loading ? (
                         <div className="flex justify-center items-center h-full text-gray-400 font-medium py-20">
                            <span className="animate-pulse">Loading menus...</span>
                         </div>
                     ) : error ? (
                         <div className="flex flex-col items-center justify-center h-full text-red-500 bg-red-50/50 rounded-xl p-6">
                            <span className="material-icons-round text-4xl mb-2">error_outline</span>
                            <p className="font-semibold">{error}</p>
                            <button 
                                onClick={() => dispatch(fetchMenus())}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold"
                            >
                                Retry
                            </button>
                         </div>
                     ) : (
                         <MenuTree 
                            items={filteredItems} 
                            onSelect={handleSelect}
                            selectedId={selectedItem?.id}
                         />
                     )}
                </div>

                {/* Right Column: details */}
                <div id="menu-details-form" className="lg:w-5/12 p-4 lg:p-6 bg-white scroll-mt-4">
                    <MenuForm selectedItem={selectedItem} />
                </div>
           </div>
       </div>

       <Modal 
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onConfirm={handleAddItem}
            title="Add New Menu?"
            message="This will create a new root menu item at the top level."
            confirmLabel="Add Menu"
            type="primary"
       />
    </div>
  );
}
