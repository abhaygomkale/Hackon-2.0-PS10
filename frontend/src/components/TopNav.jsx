import React, { useState, useRef, useEffect } from 'react';
import { Menu, UserCircle, LogOut, Phone, Mail, Award, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopNav({ toggleSidebar }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-white h-16 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between px-4 sm:px-6 transition-all duration-300">

            {/* Left Menu Icon */}
            <button
                onClick={toggleSidebar}
                className="p-2 text-slate-500 hover:text-medical-blue hover:bg-slate-50 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                <Menu size={26} strokeWidth={2.5} />
            </button>

            {/* Center Title */}
            <div className="flex-1 flex justify-center pointer-events-none">
                <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-indigo-800 tracking-tight hidden sm:block">
                    AI Emergency Triage Assistant
                </h1>
                <h1 className="text-lg font-extrabold text-medical-blue tracking-tight sm:hidden">
                    AI Triage
                </h1>
            </div>

            {/* Right Profile */}
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-full cursor-pointer transition-all group shadow-sm ${dropdownOpen ? 'bg-blue-50 border-blue-200 text-medical-blue' : 'bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-100'}`}
                >
                    <UserCircle size={22} className={`transition-colors ${dropdownOpen ? 'text-medical-blue' : 'text-slate-400 group-hover:text-medical-blue'}`} />
                    <span className={`text-sm font-bold ${dropdownOpen ? 'text-medical-blue' : 'text-slate-600 group-hover:text-medical-blue'}`}>Dr. Dashboard</span>
                </div>

                {/* Doctor Details Dropdown */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                        {/* Header / ID Badge */}
                        <div className="bg-gradient-to-br from-medical-blue to-indigo-800 p-5 text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30">
                                    <UserCircle size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-lg tracking-wide">Dr. Dashboard</h3>
                                    <p className="text-blue-100 text-sm font-medium">Chief of Emergency</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between text-sm p-2 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                    <Award size={14} className="text-medical-blue" /> ID Number
                                </span>
                                <span className="text-slate-800 font-extrabold tracking-widest font-mono">#992-ER</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm p-2">
                                <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700 leading-tight">Emergency Ward A</p>
                                    <p className="text-xs text-slate-400 font-medium">Main Hospital Wing</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm p-2">
                                <div className="p-1.5 bg-slate-50 text-slate-500 rounded-lg">
                                    <Phone size={16} />
                                </div>
                                <p className="font-semibold text-slate-700 leading-tight">Ext: 8842</p>
                            </div>

                        </div>

                        {/* Logout Footer */}
                        <div className="p-3 bg-slate-50 border-t border-slate-100">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-all text-sm"
                            >
                                <LogOut size={16} />
                                Sign Out Panel
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
