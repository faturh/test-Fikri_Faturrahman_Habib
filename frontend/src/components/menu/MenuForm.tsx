import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateMenu, deleteMenu, MenuItem } from '@/store/menusSlice';

interface MenuFormProps {
    selectedItem?: MenuItem | null;
}

const MenuForm = ({ selectedItem }: MenuFormProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
        }
    }, [selectedItem]);

    if (!selectedItem) {
        return <div className="text-gray-500 text-center py-20">Select a menu item to view details</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem && name) {
            dispatch(updateMenu({ id: selectedItem.id, data: { name } }));
        }
    };

    const handleDelete = () => {
        if (selectedItem && confirm('Are you sure you want to delete this menu item?')) {
            dispatch(deleteMenu(selectedItem.id));
        }
    };

  return (
    <form className="space-y-6 max-w-lg" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Menu ID</label>
        <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-500 dark:text-gray-400 focus:ring-0 cursor-not-allowed text-sm font-mono" 
            readOnly 
            type="text" 
            value={selectedItem.id} 
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Depth</label>
        <input 
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 transition-shadow" 
            type="number" 
            readOnly 
            value={selectedItem.depth} 
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Parent Data</label>
        <div className="relative">
          <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50" 
            type="text" 
            value={selectedItem.parent?.name || "Root"} 
            readOnly 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Name</label>
        <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="pt-4 flex gap-4">
        <button 
            className="flex-1 bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5" 
            type="submit"
        >
            Save
        </button>
        <button 
             type="button"
             onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-4 rounded-full shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5" 
        >
            Delete
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
