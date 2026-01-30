"use client";

import React, { useState } from 'react';
import MenuTree, { MenuItem } from '@/components/menu/MenuTree';
import MenuForm from '@/components/menu/MenuForm';

const DUMMY_DATA: MenuItem[] = [
  {
    id: "root",
    name: "system management",
    depth: 0,
    children: [
      {
        id: "1",
        name: "System Management",
        depth: 1,
        parentId: "root",
        children: [
          {
            id: "1-1",
            name: "Systems",
            depth: 2,
            parentId: "1",
            children: [
                {
                    id: "1-1-1",
                    name: "System Code",
                    depth: 3,
                    parentId: "1-1",
                    children: [
                         { id: "1-1-1-1", name: "Code Registration", depth: 4, parentId: "1-1-1" },
                         { id: "1-1-1-2", name: "Code Registration - 2", depth: 4, parentId: "1-1-1" }
                    ]
                },
                {
                    id: "1-1-2",
                    name: "Properties",
                    depth: 3,
                    parentId: "1-1",
                },
                {
                    id: "1-1-3",
                    name: "Menus",
                    depth: 3,
                    parentId: "1-1",
                    children: [
                        { id: "1-1-3-1", name: "Menu Registration", depth: 4, parentId: "1-1-3" }
                    ]
                },
                {
                   id: "1-1-4",
                   name: "API List",
                   depth: 3,
                   parentId: "1-1",
                   children: [
                       { id: "1-1-4-1", name: "API Registration", depth: 4, parentId: "1-1-4" },
                       { id: "1-1-4-2", name: "API Edit", depth: 4, parentId: "1-1-4" }
                   ]
                }
            ]
          },
          {
              id: "1-2",
              name: "Users & Groups",
              depth: 2,
              parentId: "1",
              children: [
                  {
                      id: "1-2-1",
                      name: "Users",
                      depth: 3,
                      parentId: "1-2",
                      children: [
                          { id: "1-2-1-1", name: "User Account Registration", depth: 4, parentId: "1-2-1" }
                      ]
                  },
                  {
                      id: "1-2-2",
                      name: "Groups",
                      depth: 3,
                      parentId: "1-2",
                      children: [
                           { id: "1-2-2-1", name: "User Group Registration", depth: 4, parentId: "1-2-2" }
                      ]
                  }
              ]
          }
        ]
      }
    ]
  }
];

export default function Home() {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [treeData, setTreeData] = useState<MenuItem[]>(DUMMY_DATA);

    const handleSelect = (item: MenuItem) => {
        setSelectedItem(item);
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
                        <option>user management</option>
                        <option>content management</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <span className="material-icons-round">expand_more</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white text-sm font-medium rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                    Expand All
                </button>
                <button className="px-6 py-2 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Collapse All
                </button>
            </div>
       </header>
       
       <div className="flex-1 overflow-hidden px-8 pb-8">
           <div className="h-full flex flex-col lg:flex-row bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                {/* Left Column: Tree */}
                <div className="flex-1 overflow-y-auto p-6 border-r border-gray-100 dark:border-gray-800 lg:w-7/12">
                     <MenuTree 
                        items={treeData} 
                        onSelect={handleSelect}
                        selectedId={selectedItem?.id}
                     />
                </div>

                {/* Right Column: details */}
                <div className="lg:w-5/12 p-6 overflow-y-auto bg-white dark:bg-background-dark">
                    <MenuForm 
                        selectedItem={selectedItem ? {
                            id: selectedItem.id,
                            name: selectedItem.name,
                            depth: selectedItem.depth,
                            parentName: "Systems" // In real app get from parentId search
                        } : null} 
                    />
                </div>
           </div>
       </div>
    </div>
  );
}
