"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateMenu, deleteMenu, MenuItem } from '@/store/menusSlice';
import Modal from '@/components/common/Modal';

interface MenuFormProps {
    selectedItem?: MenuItem | null;
}

const MenuForm = ({ selectedItem }: MenuFormProps) => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.menus.items);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // Helpers
    const flatten = (nodes: MenuItem[]): MenuItem[] => {
        let result: MenuItem[] = [];
        for (const node of nodes) {
            result.push(node);
            if (node.children) {
                result = result.concat(flatten(node.children));
            }
        }
        return result;
    };

    const flatItems = React.useMemo(() => flatten(items), [items]);

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setParentId(selectedItem.parentId || null);
        }
    }, [selectedItem]);

    if (!selectedItem) {
        return <div className="text-gray-500 text-center py-20 font-medium italic">Select a menu item to view details</div>;
    }

    const handleSave = () => {
        if (selectedItem && name) {
            dispatch(updateMenu({ 
                id: selectedItem.id, 
                data: { 
                    name,
                    parentId: parentId === "" ? null : parentId
                } 
            }));
        }
    };

    const handleDelete = () => {
        if (selectedItem) {
            dispatch(deleteMenu(selectedItem.id));
        }
    };

  return (
    <>
        <form className="space-y-6 max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="block text-sm text-gray-500 mb-2 font-medium">Menu ID</label>
                <input 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 focus:ring-0 cursor-not-allowed text-sm font-mono" 
                    readOnly 
                    type="text" 
                    value={selectedItem.id} 
                />
            </div>
            
            <div>
                <label className="block text-sm text-gray-500 mb-2 font-medium">Depth</label>
                <input 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 focus:ring-0 cursor-not-allowed text-sm" 
                    type="number" 
                    readOnly 
                    value={selectedItem.depth} 
                />
            </div>

            <div>
                <label className="block text-sm text-gray-500 mb-2 font-medium">Parent Menu (Restructure)</label>
                <div className="relative">
                    <select 
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer"
                        value={parentId || ""}
                        onChange={(e) => setParentId(e.target.value || null)}
                    >
                        <option value="">Root (No Parent)</option>
                        {flatItems
                            .filter(item => item.id !== selectedItem.id) // Cannot be own parent
                            .map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <span className="material-icons-round">expand_more</span>
                    </div>
                </div>
                <p className="mt-1 text-[10px] text-gray-400">Select a different menu to move this item and its children.</p>
            </div>

            <div>
                <label className="block text-sm text-gray-500 mb-2 font-medium">Name</label>
                <input 
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all" 
                    type="text" 
                    placeholder="Type menu name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="pt-4 flex gap-4">
                <button 
                    type="button"
                    onClick={() => setIsSaveModalOpen(true)}
                    className="flex-1 bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0" 
                >
                    Save
                </button>
                <button 
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex-1 bg-white border border-red-100 text-red-500 hover:bg-red-50 font-semibold py-3.5 px-4 rounded-full transition-all" 
                >
                    Delete
                </button>
            </div>
        </form>

        {/* Confirmation Modals */}
        <Modal 
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onConfirm={handleSave}
            title="Save Changes?"
            message={`Are you sure you want to update this menu? Moving it to a new parent will also move all its sub-items.`}
            confirmLabel="Save Changes"
            type="primary"
        />

        <Modal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Delete Menu Item?"
            message={`Are you sure you want to delete "${name}"? This action cannot be undone and will delete all sub-items.`}
            confirmLabel="Delete Now"
            cancelLabel="Cancel"
            type="danger"
        />
    </>
  );
};

export default MenuForm;
