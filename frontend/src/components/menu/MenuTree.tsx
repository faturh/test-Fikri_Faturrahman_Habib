"use client";

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { MenuItem, toggleExpand, addMenu, updateMenu, setNotification } from '@/store/menusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Modal from '@/components/common/Modal';

interface MenuTreeProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  selectedId?: string;
}

const MenuTree = ({ items, onSelect, selectedId }: MenuTreeProps) => {
  const dispatch = useAppDispatch();
  const [isOverRoot, setIsOverRoot] = useState(false);

  const onDropRoot = (e: React.DragEvent) => {
      e.preventDefault();
      setIsOverRoot(false);
      const draggedId = e.dataTransfer.getData("menuId");
      if (!draggedId) return;
      
      dispatch(updateMenu({ 
          id: draggedId, 
          data: { 
              parentId: null,
              depth: 0 
          } 
      }));
  };

  return (
    <div 
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsOverRoot(true)}
        onDragLeave={() => setIsOverRoot(false)}
        onDrop={onDropRoot}
        className={cn(
            "text-sm min-h-[200px] transition-colors rounded-xl p-2 relative border-2 border-transparent",
            isOverRoot && "bg-blue-50/50 border-dashed border-primary"
        )}
    >
      {items.map((item) => (
        <MenuNode key={item.id} item={item} onSelect={onSelect} selectedId={selectedId} allItems={items} />
      ))}
      
      {items.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium">
             <span className="material-icons-round text-4xl block mb-2 opacity-20">account_tree</span>
             No menu items found
          </div>
      )}

      {isOverRoot && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center z-50 pointer-events-none">
              <div className="bg-primary text-white px-4 py-2 rounded-full shadow-xl text-xs font-bold animate-bounce flex items-center gap-2">
                <span className="material-icons-round text-sm">vertical_align_top</span>
                Drop to move to Root (Depth 0)
              </div>
          </div>
      )}
    </div>
  );
};

const MenuNode = ({ 
  item, 
  onSelect, 
  selectedId, 
  allItems,
  isChild = false 
}: { 
  item: MenuItem; 
  onSelect?: (item: MenuItem) => void; 
  selectedId?: string;
  allItems: MenuItem[];
  isChild?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const expandedIds = useAppSelector(state => state.menus.expandedIds);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [dropType, setDropType] = useState<'above' | 'below' | null>(null);
  
  const isOpen = expandedIds.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleExpand(item.id));
  };

  const handleAddChild = () => {
      dispatch(addMenu({ 
          name: "New Menu", 
          depth: item.depth + 1, 
          parentId: item.id 
      }));
  };

  // Drag and Drop Handlers
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("menuId", item.id);
    e.dataTransfer.effectAllowed = "move";
    
    // Create a ghost image if desired, but native is fine
    const target = e.target as HTMLElement;
    target.style.opacity = "0.4";
  };

  const onDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    setDropType(null);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    // 30% top = above (same level), rest = below (as child)
    if (y < rect.height * 0.3) {
        setDropType('above');
    } else {
        setDropType('below');
    }
  };

  const onDragLeave = () => {
    setDropType(null);
  };

  const isDescendant = (node: MenuItem, targetId: string): boolean => {
      if (!node.children) return false;
      for (const child of node.children) {
          if (child.id === targetId) return true;
          if (isDescendant(child, targetId)) return true;
      }
      return false;
  };

  const findNodeInTree = (nodes: MenuItem[], id: string): MenuItem | null => {
      for (const n of nodes) {
          if (n.id === id) return n;
          if (n.children) {
              const found = findNodeInTree(n.children, id);
              if (found) return found;
          }
      }
      return null;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData("menuId");
    const currentDropType = dropType;
    setDropType(null);
    
    if (!draggedId || draggedId === item.id) return;

    // Check for circular dependency
    const draggedItem = findNodeInTree(allItems, draggedId);
    if (draggedItem && isDescendant(draggedItem, item.id)) {
        dispatch(setNotification({ message: "Cannot move a menu into its own children", type: "error" }));
        return;
    }

    let targetParentId: string | null = null;
    let targetDepth = 0;

    if (currentDropType === 'above') {
        targetParentId = item.parentId || null;
        targetDepth = item.depth;
    } else {
        targetParentId = item.id;
        targetDepth = item.depth + 1;
    }

    dispatch(updateMenu({ 
        id: draggedId, 
        data: { 
            parentId: targetParentId,
            depth: targetDepth
        } 
    }));
  };

  return (
    <div className="relative">
       {/* Connector Line for children */}
       {isChild && (
           <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100 -ml-[1px]"></div>
       )}
       {isChild && (
           <div className="absolute w-4 h-px bg-slate-100 left-0 top-[22px]"></div>
       )}

      {/* Node Content */}
      <div 
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
            "flex items-center gap-3 py-2.5 px-3 cursor-pointer transition-all rounded-xl group/item relative mb-1",
            isSelected ? "bg-primary text-white shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50",
            dropType === 'above' && "ring-2 ring-primary ring-offset-2 z-10",
            dropType === 'below' && "ring-2 ring-emerald-500 ring-offset-2 z-10",
        )}
        onClick={(e) => {
            e.stopPropagation();
            onSelect?.(item);
        }}
      >
        {/* Drop Indicators Visual */}
        {dropType === 'above' && (
            <div className="absolute -top-1.5 inset-x-0 h-1 bg-primary rounded-full animate-pulse shadow-sm"></div>
        )}
        {dropType === 'below' && (
            <div className="absolute -bottom-1.5 inset-x-0 h-1 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
        )}

        <div className="flex items-center gap-1 min-w-[24px]">
            <span className={cn(
                "material-icons-round text-sm cursor-grab active:cursor-grabbing opacity-0 group-hover/item:opacity-100 transition-opacity",
                isSelected ? "text-white/60" : "text-slate-300"
            )}>
                drag_indicator
            </span>
            <button 
                onClick={handleToggle}
                className={cn(
                    "flex items-center justify-center transition-all",
                    !hasChildren && "opacity-0 pointer-events-none"
                )}
            >
                <span className={cn(
                    "material-icons-round text-xl transition-transform duration-300",
                    isOpen ? "" : "-rotate-90",
                    isSelected ? "text-white" : "text-slate-400"
                )}>
                    expand_more
                </span>
            </button>
        </div>
        
        <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="font-medium truncate">{item.name}</span>
            <span className={cn(
                "hidden group-hover/item:inline-block text-[10px] px-1.5 py-0.5 rounded-md font-bold",
                isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
            )}>
                D{item.depth}
            </span>
        </div>
        
        {/* Add Button */}
        <button 
            onClick={(e) => {
                e.stopPropagation();
                setIsAddChildModalOpen(true);
            }}
            className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm transform scale-0 group-hover/item:scale-100",
                isSelected ? "bg-white text-primary hover:bg-white/90 scale-100" : "bg-primary text-white hover:bg-blue-600"
            )}
        >
            <span className="material-icons-round text-sm font-bold">add</span>
        </button>

        {/* Floating Tooltip during drag */}
        {dropType && (
            <div className={cn(
                "absolute -right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-[10px] text-white font-bold shadow-xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95",
                dropType === 'above' ? "bg-primary" : "bg-emerald-500"
            )}>
                {dropType === 'above' ? `Move to Sibling (Depth ${item.depth})` : `Move to Child (Depth ${item.depth + 1})`}
            </div>
        )}
      </div>

      <Modal 
          isOpen={isAddChildModalOpen}
          onClose={() => setIsAddChildModalOpen(false)}
          onConfirm={handleAddChild}
          title="Add Sub-menu?"
          message={`Create a new item inside "${item.name}"?`}
          confirmLabel="Create Sub-menu"
          type="primary"
      />

      {/* Children Tree */}
      {hasChildren && isOpen && (
        <div className="pl-6 ml-4">
           {item.children!.map(child => (
               <MenuNode 
                key={child.id} 
                item={child} 
                onSelect={onSelect} 
                selectedId={selectedId} 
                allItems={allItems}
                isChild={true} 
               />
           ))}
        </div>
      )}
    </div>
  );
};

export default MenuTree;
