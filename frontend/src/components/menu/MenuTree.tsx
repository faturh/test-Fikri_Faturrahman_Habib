import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/store/menusSlice';

interface MenuTreeProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  selectedId?: string;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
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
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  return (
    <div className="relative">
       {/* Connector for children items */}
       {isChild && (
           <span className="absolute w-4 h-px bg-gray-200 dark:bg-gray-700 left-0 top-1/2 -translate-y-1/2"></span>
       )}

      {/* Node Label */}
      <div 
        className={cn(
            "flex items-center gap-2 py-2 cursor-pointer transition-colors rounded-md",
            isChild ? "pl-6" : "",
            isSelected ? "text-primary font-bold" : "text-gray-700 dark:text-gray-200"
        )}
        onClick={(e) => {
            e.stopPropagation();
            onSelect?.(item);
        }}
      >
        {hasChildren ? (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
                <span className="material-icons-round text-lg transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                    expand_more
                </span>
            </button>
        ) : (
            // Spacer for alignment if no chevron
             <span className="w-[18px]"></span> 
             // Actually, the dot might be better if no children, or just padding.
             // Looking at image: leaf nodes just have text padding.
             // But if we want consistent alignment:
        )}
        
        <span className={cn(isSelected ? "text-primary" : "")}>{item.name}</span>
        
        {/* Add Button (Mock) - only show on hover? or logic based? Image shows it on "System Code" */}
        {isSelected && (
             <button className="ml-2 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm">
                <span className="material-icons-round text-[10px] font-bold">add</span>
            </button>
        )}
      </div>

      {/* Children Container */}
      {hasChildren && isOpen && (
        <div className={cn(
            "relative pl-6 ml-2 border-l border-gray-200 dark:border-gray-700",
            // If it's a child itself, we might need different spacing, but the recursive structure usually handles it with the border-l
            // Image shows nested levels have their own border line.
            // The HTML logic: top level no border-l on the item itself? 
            // The HTML structure:
            // <div class="relative pl-6 ml-2 border-l ..."> -> Children wrapper
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
