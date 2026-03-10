import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, LayoutDashboard, ChevronDown, ChevronRight, X, HeartPulse } from 'lucide-react';

export default function SlidingSidebar({ isOpen, closeSidebar }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [historyOpen, setHistoryOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navigateAndClose = (path) => {
        navigate(path);
        closeSidebar();
    };

    return (
        <>
            {/* Dark Overlay when sidebar is open */}
            <div
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 to-indigo-950 text-slate-300 shadow-[20px_0_40px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-400 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} rounded-r-[2rem] flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-medical-blue/20 p-2 rounded-xl backdrop-blur-md">
                            <HeartPulse size={24} className="text-blue-400 animate-pulse" />
                        </div>
                        <h2 className="font-extrabold text-white text-lg tracking-wide">HealthAI</h2>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">

                    <button
                        onClick={() => navigateAndClose('/dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive('/dashboard') ? 'bg-medical-blue text-white shadow-lg' : 'hover:bg-white/10 hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigateAndClose('/history')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive('/history') ? 'bg-medical-blue text-white shadow-lg' : 'hover:bg-white/10 hover:text-white text-slate-300'}`}
                    >
                        <Clock size={18} />
                        Patient Details
                    </button>

                    <button
                        onClick={() => navigateAndClose('/ward-history')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive('/ward-history') ? 'bg-medical-blue text-white shadow-lg' : 'hover:bg-white/10 hover:text-white text-slate-300'}`}
                    >
                        <HeartPulse size={18} />
                        Ward Info
                    </button>

                </div>

                {/* Bottom Logo Fade */}
                <div className="p-6 text-center border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Secure Protocol Active</p>
                </div>

            </div>
        </>
    );
}
