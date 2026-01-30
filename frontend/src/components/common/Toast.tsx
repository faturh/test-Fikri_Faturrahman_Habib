"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearNotification } from '@/store/menusSlice';
import { cn } from '@/lib/utils';

const Toast = () => {
    const dispatch = useAppDispatch();
    const notification = useAppSelector(state => state.menus.notification);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    if (!notification) return null;

    const config = {
        success: { 
            bg: 'bg-emerald-500', 
            icon: 'check_circle',
            shadow: 'shadow-emerald-500/40'
        },
        error: { 
            bg: 'bg-rose-500', 
            icon: 'error',
            shadow: 'shadow-rose-500/40'
        },
        info: { 
            bg: 'bg-blue-500', 
            icon: 'info',
            shadow: 'shadow-blue-500/40'
        }
    }[notification.type];

    return (
        <div className="fixed top-4 lg:top-8 right-4 lg:right-8 left-4 lg:left-auto z-[100000] animate-in fade-in slide-in-from-top-4 lg:slide-in-from-right-8 duration-500">
            <div className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold w-full lg:min-w-[300px]",
                config.bg,
                config.shadow
            )}>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-round text-xl text-white">
                        {config.icon}
                    </span>
                </div>
                <div className="flex-1">
                    <p className="text-sm leading-tight">{notification.message}</p>
                </div>
                <button 
                    onClick={() => dispatch(clearNotification())}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                >
                    <span className="material-icons-round text-lg">close</span>
                </button>
            </div>
        </div>
    );
};

export default Toast;
