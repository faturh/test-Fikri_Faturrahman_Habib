import React from 'react';
import { cn } from '@/lib/utils';
import { MenuItem, toggleExpand, addMenu } from '@/store/menusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface MenuTreeProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  selectedId?: string;
}

const MenuTree = ({ items, onSelect, selectedId }: MenuTreeProps) => {
  return (
    <div className="text-sm">
      {items.map((item) => (
        <MenuNode key={item.id} item={item} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  );
};

const MenuNode = ({ 
  item, 
  onSelect, 
  selectedId, 
  isChild = false 
}: { 
  item: MenuItem; 
  onSelect?: (item: MenuItem) => void; 
  selectedId?: string;
  isChild?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const expandedIds = useAppSelector(state => state.menus.expandedIds);
  
  const isOpen = expandedIds.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleExpand(item.id));
  };

  const handleAddChild = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(addMenu({ 
          name: "New Menu", 
          depth: item.depth + 1, 
          parentId: item.id 
      }));
  };

  return (
    <div className="relative">
       {/* Connector for children items */}
       {isChild && (
           <span className="absolute w-4 h-px bg-gray-200 dark:bg-gray-700 left-0 top-1/2 -translate-y-1/2"></span>
       )}

      {/* Node Label */}
      <div 
        className={cn(
            "flex items-center gap-2 py-2 cursor-pointer transition-colors rounded-md group pr-4",
            isChild ? "pl-6" : "pl-2",
            isSelected ? "text-primary font-bold bg-blue-50/50 dark:bg-blue-900/20" : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        )}
        onClick={(e) => {
            e.stopPropagation();
            onSelect?.(item);
        }}
      >
        <button 
                onClick={handleToggle}
                className={cn(
                    "text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center transition-opacity",
                    !hasChildren && "opacity-0 pointer-events-none"
                )}
            >
                <span className="material-icons-round text-lg transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                    expand_more
                </span>
        </button>
        
        <span className={cn(isSelected ? "text-primary dark:text-blue-400" : "flex-1")}>{item.name}</span>
        
        {/* Add Button (+) */}
        <button 
            onClick={handleAddChild}
            className={cn(
                "ml-auto w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-sm transform scale-0 group-hover:scale-100",
                isSelected && "scale-100"
            )}
        >
            <span className="material-icons-round text-[10px] font-bold">add</span>
        </button>
      </div>

      {/* Children Container */}
      {hasChildren && isOpen && (
        <div className={cn(
            "relative pl-6 ml-2 border-l border-gray-200 dark:border-gray-700",
        )}>
           {item.children!.map(child => (
               <MenuNode key={child.id} item={child} onSelect={onSelect} selectedId={selectedId} isChild={true} />
           ))}
        </div>
      )}
    </div>
  );
};

export default MenuTree;
