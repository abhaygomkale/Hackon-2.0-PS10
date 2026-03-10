import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SlidingSidebar from '../components/SlidingSidebar';
import { Search, Filter, Calendar, AlertTriangle, User as UserIcon, Clock, CheckCircle2, FileText } from 'lucide-react';

export default function History() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        // Load patient history from local storage on mount
        const savedHistory = JSON.parse(localStorage.getItem('patients_history')) || [];
        // Sort so newest are first
        savedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistory(savedHistory);
    }, []);

    const getPriorityColors = (level) => {
        switch (level) {
            case 'Critical': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500', icon: 'text-red-500' };
            case 'High': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-500', icon: 'text-orange-500' };
            case 'Moderate': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-400', icon: 'text-yellow-500' };
            case 'Low': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500', icon: 'text-green-500' };
            default: return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', icon: 'text-blue-500' };
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'Unknown Date';
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' • ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Filter and search logic
    const filteredHistory = history.filter(patient => {
        const matchesSearch = (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterPriority === 'All' || patient.priorityLevel === filterPriority;
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <TopNav toggleSidebar={() => setSidebarOpen(true)} />
            <SlidingSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <div className="min-h-screen w-full flex items-center justify-center p-4 pt-20 relative overflow-hidden font-sans bg-[#f8fafc]">

                {/* Animated Background Elements (Matches Dashboard) */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-red-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none"></div>

                <div className="backdrop-blur-xl w-full max-w-6xl rounded-[2rem] overflow-hidden border border-white/50 bg-white/80 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] relative z-10 flex flex-col max-h-[85vh]">

                    {/* Top Decorative Bar */}
                    <div className="h-2 w-full bg-[length:200%_auto] animate-[gradient_3s_ease_infinite] bg-gradient-to-r from-medical-blue via-blue-400 to-medical-blue shrink-0"></div>

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 pb-4 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-2xl shadow-sm border border-white">
                                <FileText className="text-medical-blue h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                    Patient History
                                </h1>
                                <p className="text-slate-500 font-medium">Archived triage reports and AI evaluations.</p>
                            </div>
                        </div>

                        {/* Total count badge */}
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Records</span>
                            <span className="bg-medical-blue/10 text-medical-blue px-3 py-1 rounded-lg font-extrabold text-lg">
                                {history.length}
                            </span>
                        </div>
                    </div>

                    {/* Controls: Search & Filter */}
                    <div className="bg-white p-8 pt-4 flex flex-col sm:flex-row gap-4 shrink-0">

                        {/* Search */}
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-medical-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Search patient name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative min-w-[200px]">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <Filter className="h-4 w-4" />
                            </div>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-10 py-3 rounded-xl text-slate-700 font-bold focus:outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="All">All Priorities</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High / Urgent</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Low">Low / Non-Urgent</option>
                            </select>
                            {/* Custom dropdown arrow */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                    </div>

                    {/* Cards Grid Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8 pt-4">
                        {filteredHistory.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
                                <div className="bg-slate-50 p-6 rounded-full mb-6 relative">
                                    <Search size={48} className="text-slate-300" />
                                    <div className="absolute top-0 right-0 w-6 h-6 bg-red-400 rounded-full border-4 border-white"></div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No patients found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">
                                    {history.length === 0
                                        ? "You haven't analyzed any patients yet. Start a new triage session to build your history."
                                        : "We couldn't find any patients matching your current search or filter criteria."}
                                </p>
                                {history.length > 0 && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setFilterPriority('All'); }}
                                        className="mt-6 font-bold text-medical-blue hover:text-blue-700 underline underline-offset-4"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filteredHistory.map((patient, index) => {
                                    const colors = getPriorityColors(patient.priorityLevel);

                                    return (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 border-l-4 overflow-hidden flex flex-col ${colors.border}`}
                                            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                                        >
                                            {/* Card Head */}
                                            <div className="p-4 border-b border-slate-50 flex justify-between items-start bg-slate-50/50">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 bg-white rounded-lg shadow-sm border border-slate-100 ${colors.icon}`}>
                                                        <UserIcon size={18} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800 leading-tight">{patient.name || 'Unknown Patient'}</h3>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{patient.age}y • {patient.gender}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-5 flex-1 flex flex-col gap-4">

                                                {/* Priority Tag */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Priority Result</span>
                                                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1.5 ${colors.bg} ${colors.text}`}>
                                                        {patient.priorityLevel === 'Critical' && <AlertTriangle size={12} />}
                                                        {patient.priorityLevel}
                                                    </div>
                                                </div>

                                                {/* Symptoms */}
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">Symptoms</span>
                                                    <p className="text-sm font-medium text-slate-700 leading-snug line-clamp-2">
                                                        "{patient.symptom || 'No symptoms reported'}"
                                                    </p>
                                                </div>

                                            </div>

                                            {/* Card Footer (Timestamp) */}
                                            <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                                                <Calendar size={14} className="text-slate-400" />
                                                {formatDate(patient.date)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
