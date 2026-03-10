import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, Bell, Settings, HeartPulse, ArrowRight, UserPlus, Activity, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

export default function MainDashboard() {
    const navigate = useNavigate();
    const [patientCount, setPatientCount] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = () => {
        if (!patientCount) {
            setError("Please enter the number of patients.");
            return;
        }
        const count = parseInt(patientCount, 10);
        if (count < 1 || count > 20) {
            setError("Valid number: 1 - 20");
            return;
        }
        navigate("/patient-form", { state: { patientCount: count } });
    };

    return (
        <div className="min-h-screen bg-[#F0FDF4] bg-gradient-to-br from-[#E6F8F3] via-[#EFFBF6] to-[#E2F7F0] flex font-sans">

            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-8 relative overflow-hidden z-10">

                {/* Soft Decorative Globs matching Reference */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/40 blur-[100px] rounded-[100%] pointer-events-none -z-10"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D1FAE5]/50 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                {/* Top Navbar */}
                <div className="flex justify-between items-center mb-16 animate-[fadeIn_0.5s_ease-out]">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search patients, IDs..."
                            className="w-full bg-white/70 backdrop-blur-md border border-white px-12 py-3 rounded-2xl text-slate-700 font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-white/70 backdrop-blur-md border border-white p-3 rounded-full text-slate-500 hover:text-emerald-600 shadow-sm transition-all hover:shadow-md relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="bg-[#E6F4EA] border border-[#D1FAE5] p-3 rounded-full text-emerald-600 shadow-sm transition-all hover:bg-[#D1FAE5]">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-16 animate-[fadeIn_0.7s_ease-out]">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-emerald-500 tracking-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
                        Emergency Dashboard
                    </h1>
                    <p className="text-slate-600 font-bold text-lg mb-10 tracking-wide">
                        Analyze Vitals. Prioritize Care. Save Lives.
                    </p>

                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => document.getElementById('new-triage')?.focus()}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold shadow-[0_8px_20px_-8px_rgba(5,150,105,0.6)] hover:shadow-[0_12px_25px_-8px_rgba(5,150,105,0.7)] hover:-translate-y-0.5 transition-all w-48"
                        >
                            Start Triage
                        </button>
                        <button className="bg-transparent border border-emerald-600 text-emerald-700 hover:bg-emerald-50/50 px-8 py-3.5 rounded-full font-bold transition-all w-48">
                            Download Deck
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-6 mb-16 animate-[fadeIn_0.9s_ease-out]">
                    <div className="bg-white/70 border border-emerald-100 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2">
                        <span className="text-slate-500 font-semibold text-sm">Active Patients:</span>
                        <span className="text-emerald-600 font-bold text-sm tracking-wide">134</span>
                    </div>
                    <div className="bg-white/70 border border-emerald-100 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2">
                        <span className="text-slate-500 font-semibold text-sm">Avg Wait Time:</span>
                        <span className="text-emerald-600 font-bold text-sm tracking-wide">12m</span>
                    </div>
                    <div className="bg-white/70 border border-emerald-100 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2">
                        <span className="text-slate-500 font-semibold text-sm">Critical Cases:</span>
                        <span className="text-red-500 font-extrabold text-sm tracking-wide">4</span>
                    </div>
                </div>

                {/* Activity & Input Cards Row */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeIn_1.1s_ease-out]">

                    {/* New Triage Input Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] border border-white relative overflow-hidden group">
                        <h3 className="text-slate-700 font-bold mb-6 flex items-center gap-2">
                            <UserPlus size={18} className="text-emerald-500" /> Start New Admission
                        </h3>

                        <div className="relative">
                            <input
                                id="new-triage"
                                type="number"
                                min="1"
                                max="20"
                                placeholder="Number of Patients"
                                value={patientCount}
                                onChange={(e) => {
                                    setPatientCount(e.target.value);
                                    setError('');
                                }}
                                className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-xl text-slate-700 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all mb-3 text-center text-lg"
                            />
                            <button
                                onClick={handleGenerate}
                                className="absolute right-2 top-2 bg-emerald-600 text-white p-2.5 rounded-lg hover:bg-emerald-700 transition"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="h-6 text-center">
                            {error ? (
                                <p className="text-red-500 text-xs font-bold animate-pulse">{error}</p>
                            ) : (
                                <p className="text-slate-400 text-xs font-semibold">Max 20 patients per batch</p>
                            )}
                        </div>

                        {/* Decorative chart vector */}
                        <div className="absolute bottom-4 left-0 w-full px-8 opacity-20 group-hover:opacity-40 transition-opacity flex items-end h-16 pointer-events-none">
                            <svg viewBox="0 0 200 50" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M 0 40 L 30 20 L 60 30 L 100 0 L 140 25 L 170 15 L 200 35" />
                            </svg>
                        </div>

                        <div className="absolute top-6 right-6 bg-emerald-500 text-white px-3 py-1 text-[10px] font-bold rounded-full flex gap-1 items-center shadow-sm">
                            READY <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                        </div>
                    </div>

                    {/* Activity Logs Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] border border-white relative overflow-hidden">
                        <h3 className="text-slate-700 font-bold mb-6 flex items-center gap-2">
                            <Activity size={18} className="text-emerald-500" /> Recent AI Triage History
                        </h3>

                        <div className="space-y-4">

                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-lg"><ShieldAlert size={14} className="text-red-600" /></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Batch #402</p>
                                        <p className="text-[10px] text-slate-400 font-semibold">3 Patients • 1 Critical</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Clock size={10} /> 2m ago</span>
                            </div>

                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-100 p-2 rounded-lg"><CheckCircle size={14} className="text-emerald-600" /></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Batch #401</p>
                                        <p className="text-[10px] text-slate-400 font-semibold">1 Patient • Moderate</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Clock size={10} /> 45m ago</span>
                            </div>

                        </div>

                        <div className="absolute top-6 right-6 bg-yellow-400 text-slate-900 px-3 py-1 text-[10px] font-bold rounded-full flex gap-1 items-center shadow-sm">
                            0.965 AI Acc. <div className="w-1.5 h-1.5 bg-slate-900/50 rounded-full"></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
