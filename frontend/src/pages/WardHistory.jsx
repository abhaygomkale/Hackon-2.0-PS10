import React, { useState } from 'react';
import { Building2, Bed, Beaker, HeartPulse, UserCircle, ActivitySquare, AlertCircle } from 'lucide-react';
import TopNav from '../components/TopNav';
import SlidingSidebar from '../components/SlidingSidebar';

export default function WardHistory() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock Data for Wards (As requested in prompt)
    const mockWards = [
        {
            id: 1,
            name: "ICU Ward",
            totalBeds: 10,
            occupiedBeds: 10,
            doctorIncharge: "Dr. Sharma",
            emergencySlots: 0,
            patients: ["John Doe (Critical)", "Sarah Smith (Critical)", "Mike Johnson (Critical)"]
        },
        {
            id: 2,
            name: "General Emergency",
            totalBeds: 25,
            occupiedBeds: 22,
            doctorIncharge: "Dr. Patel",
            emergencySlots: 2,
            patients: ["Emma Davis (Moderate)", "James Wilson (Stable)"]
        },
        {
            id: 3,
            name: "Trauma Center",
            totalBeds: 15,
            occupiedBeds: 8,
            doctorIncharge: "Dr. Chen",
            emergencySlots: 5,
            patients: ["Robert Brown (High Risk)", "Lisa Taylor (Critical)"]
        },
        {
            id: 4,
            name: "Observation Unit",
            totalBeds: 30,
            occupiedBeds: 15,
            doctorIncharge: "Dr. Williams",
            emergencySlots: 10,
            patients: ["David Miller (Stable)", "Anna White (Stable)", "Tom Harris (Stable)"]
        }
    ];

    // Helper logic for statuses
    const getWardStatus = (availableBeds) => {
        if (availableBeds === 0) return { label: 'Full', color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertCircle size={14} /> };
        if (availableBeds > 0 && availableBeds <= 5) return { label: 'Limited', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <ActivitySquare size={14} /> };
        return { label: 'Available', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <HeartPulse size={14} /> };
    };

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
                                <Building2 className="text-medical-blue h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                    Ward Information
                                </h1>
                                <p className="text-slate-500 font-medium">Real-time capacity tracking and patient assignments.</p>
                            </div>
                        </div>
                        {/* Total count badge */}
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Wards</span>
                            <span className="bg-medical-blue/10 text-medical-blue px-3 py-1 rounded-lg font-extrabold text-lg">
                                {mockWards.length}
                            </span>
                        </div>
                    </div>


                    {/* Ward Cards Grid Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8 pt-4">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {mockWards.map((ward, index) => {
                                const availableBeds = ward.totalBeds - ward.occupiedBeds;
                                const status = getWardStatus(availableBeds);

                                return (
                                    <div
                                        key={ward.id}
                                        className="bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
                                        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        {/* Card Header (Ward Name + Status) */}
                                        <div className="p-5 border-b border-slate-50 flex justify-between items-start bg-slate-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-medical-blue">
                                                    <Building2 size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-slate-800 leading-tight">{ward.name}</h3>
                                                    <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                                                        <UserCircle size={14} />
                                                        <span className="text-xs font-semibold">Doctor: {ward.doctorIncharge}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border flex items-center gap-1.5 shadow-sm ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </div>
                                        </div>

                                        {/* Card Body (Bed Stats) */}
                                        <div className="p-5 flex-1 flex flex-col gap-6">

                                            {/* Stats Row */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center text-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Beds</span>
                                                    <span className="text-xl font-extrabold text-slate-700">{ward.totalBeds}</span>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center text-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Available</span>
                                                    <span className={`text-xl font-extrabold ${availableBeds === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                                        {availableBeds}
                                                    </span>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center text-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Occupied</span>
                                                    <span className="text-xl font-extrabold text-slate-700">{ward.occupiedBeds}</span>
                                                </div>

                                                <div className="bg-rose-50 rounded-xl p-3 border border-rose-100 flex flex-col items-center justify-center text-center">
                                                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">ER Slots</span>
                                                    <span className="text-xl font-extrabold text-rose-600">{ward.emergencySlots}</span>
                                                </div>

                                            </div>

                                            {/* Patient Assignments */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                                                    <span className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-2">
                                                        <Bed size={14} className="text-slate-400" />
                                                        Assigned Patients
                                                    </span>
                                                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                                        Recent
                                                    </span>
                                                </div>

                                                <div className="space-y-2">
                                                    {ward.patients.length > 0 ? (
                                                        ward.patients.map((patientStr, pIdx) => {
                                                            // Simple string split hack for mock format "Name (Status)"
                                                            const parts = patientStr.split('(');
                                                            const name = parts[0].trim();
                                                            const pStatus = parts.length > 1 ? parts[1].replace(')', '').trim() : 'Unknown';

                                                            return (
                                                                <div key={pIdx} className="flex items-center justify-between bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                                                                    <span className="text-sm font-semibold text-slate-700">{name}</span>
                                                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${pStatus.includes('Critical') ? 'bg-red-50 text-red-600' :
                                                                        pStatus.includes('High Risk') ? 'bg-orange-50 text-orange-600' :
                                                                            'bg-emerald-50 text-emerald-600'
                                                                        }`}>
                                                                        {pStatus}
                                                                    </span>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <p className="text-sm text-slate-400 italic text-center py-2">No patients currently assigned.</p>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Footer Branding */}
                <div className="absolute bottom-6 text-center w-full text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
                    <span>Powered by</span>
                    <HeartPulse size={12} className="text-medical-blue" />
                    <span className="text-slate-500">HealthAI Tech</span>
                </div>

            </div>
        </>
    );
}
