import React from 'react';

interface MenuFormProps {
    selectedItem?: {
        id: string;
        name: string;
        depth: number;
        parentName?: string;
    } | null;
}

const MenuForm = ({ selectedItem }: MenuFormProps) => {
    if (!selectedItem) {
        return <div className="text-gray-500">Select a menu item to view details</div>;
    }

  return (
    <form className="space-y-6 max-w-lg" onSubmit={(e) => e.preventDefault()}>
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
            readOnly // Usually computed? but user allows edit in image? Image has explicit value "3". Let's make it readOnly for now as depth is usually structural.
            value={selectedItem.depth} 
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Parent Data</label>
        <div className="relative">
          <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50" 
            type="text" 
            value={selectedItem.parentName || "Root"} 
            readOnly // Parent usually selected via tree move?
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Name</label>
        <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50" 
            type="text" 
            defaultValue={selectedItem.name} 
        />
      </div>
      <div className="pt-4">
        <button 
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5" 
            type="submit"
        >
            Save
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
