import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, HeartPulse, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-white border-r border-[#E2E8F0] shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)] flex flex-col h-screen fixed left-0 top-0 z-50">

            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="bg-medical-blue p-2 rounded-xl shadow-sm">
                    <Activity size={24} className="text-white animate-pulse" />
                </div>
                <h2 className="font-extrabold text-slate-800 text-xl tracking-tight">AI Triage</h2>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6 px-4 space-y-2">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${isActive
                            ? 'bg-blue-50 text-medical-blue shadow-sm border border-blue-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        }`
                    }
                >
                    <LayoutDashboard size={18} />
                    Overview
                </NavLink>

                <NavLink
                    to="/triage"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${isActive
                            ? 'bg-blue-50 text-medical-blue shadow-sm border border-blue-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        }`
                    }
                >
                    <HeartPulse size={18} />
                    Active Triages
                </NavLink>

                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300"
                >
                    <HelpCircle size={18} />
                    Help & Support
                </button>

            </div>

            {/* Bottom Area */}
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm text-slate-400 hover:text-emergency-red hover:bg-red-50 transition-all"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>

        </div>
    );
}
