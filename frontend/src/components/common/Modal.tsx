"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'primary';
}

const Modal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmLabel = 'Confirm', 
    cancelLabel = 'Cancel',
    type = 'primary'
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                <div className="text-center">
                    <div className={cn(
                        "w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center",
                        type === 'danger' ? "bg-red-50 text-red-500" : "bg-blue-50 text-primary"
                    )}>
                        <span className="material-icons-round text-3xl">
                            {type === 'danger' ? 'delete_forever' : 'help_outline'}
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-500 mb-8">{message}</p>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 rounded-full border border-slate-100 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                        >
                            {cancelLabel}
                        </button>
                        <button 
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={cn(
                                "flex-1 px-6 py-3.5 rounded-full text-white font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0",
                                type === 'danger' ? "bg-red-500 hover:bg-red-600 shadow-red-500/30" : "bg-primary hover:bg-blue-700 shadow-blue-500/30"
                            )}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
