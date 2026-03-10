import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SlidingSidebar from '../components/SlidingSidebar';
import { HeartPulse, ArrowRight, Activity, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export default function EmergencyForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const patientCount = location.state?.patientCount || 1;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    // Initialize patient grid forms based on the passed count
    useEffect(() => {
        const initialPatients = Array.from({ length: patientCount }, (_, i) => ({
            id: i + 1,
            oxygen: '',
            heartRate: '',
            consciousness: 'Alert',
            result: null // Will hold the evaluated priority
        }));
        setPatients(initialPatients);
    }, [patientCount]);

    const handleUpdatePatient = (index, field, value) => {
        const updatedPatients = [...patients];
        updatedPatients[index] = { ...updatedPatients[index], [field]: value };

        // Auto-evaluate when values exist
        if (field === 'oxygen' || field === 'heartRate' || field === 'consciousness') {
            const o2 = Number(updatedPatients[index].oxygen || 0);
            const hr = Number(updatedPatients[index].heartRate || 0);
            const cLevel = updatedPatients[index].consciousness;

            // Only evaluate if numbers are provided
            if (updatedPatients[index].oxygen && updatedPatients[index].heartRate) {
                let priority = 'Stable';

                if (o2 < 90 || hr > 120 || cLevel === 'Unconscious') {
                    priority = 'Critical';
                } else if (o2 < 95 || hr > 100 || cLevel === 'Drowsy') {
                    priority = 'High Risk';
                }

                updatedPatients[index].result = priority;
            } else {
                updatedPatients[index].result = null; // Clear if empty
            }
        }

        setPatients(updatedPatients);
    };

    const handleProcessAll = () => {
        // Generate full patient mock data matching the Triage expected format and push them directly
        const newPatients = patients.map((p, i) => {
            let name = `Emergency Patient #${i + 1}`;
            let symptom = 'Critical vital overrides recorded via rapid scan.';

            return {
                name,
                age: Math.floor(Math.random() * 60) + 20,
                gender: Math.random() > 0.5 ? 'Male' : 'Female',
                priorityLevel: p.result || 'Stable',
                symptom,
                vitalStats: `SpO2: ${p.oxygen || '--'}% | HR: ${p.heartRate || '--'} BPM | ${p.consciousness}`,
                date: new Date().toISOString()
            };
        });

        // Save directly to the history local storage immediately to bypass full manual entry
        const existingHistory = JSON.parse(localStorage.getItem('patients_history')) || [];
        const updatedHistory = [...existingHistory, ...newPatients];
        localStorage.setItem('patients_history', JSON.stringify(updatedHistory));

        // After processing, send them back to the dashboard or to the Triage results view
        // Since these skip the normal queue, we can just navigate to the history page to view them immediately.
        navigate('/history');
    };

    return (
        <>
            <TopNav toggleSidebar={() => setSidebarOpen(true)} />
            <SlidingSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <div className="min-h-screen w-full bg-red-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors relative overflow-hidden">

                {/* Urgent Background Effects */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-500/10 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_2s_ease-in-out_infinite] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_3s_ease-in-out_infinite] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto animate-[fadeIn_0.4s_ease-out] relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-red-100 p-2 rounded-xl border border-red-200">
                                    <Zap className="text-red-500 h-6 w-6 animate-pulse" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                    Emergency Mass Triage
                                </h1>
                            </div>
                            <p className="text-slate-500 font-medium ml-12">Rapid AI evaluation grid for {patientCount} critical patients.</p>
                        </div>

                        <button
                            onClick={handleProcessAll}
                            className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_8px_20px_-6px_rgba(225,29,72,0.4)] transition-all hover:shadow-[0_12px_25px_-6px_rgba(225,29,72,0.5)] active:scale-[0.98] flex items-center gap-2"
                        >
                            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                            <span className="relative z-10">Process & Archive All</span>
                            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Grid of Mini Forms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {patients.map((patient, index) => (
                            <div
                                key={patient.id}
                                className={`bg-white rounded-[1.5rem] shadow-xl border overflow-hidden animate-[scaleIn_0.3s_ease-out] flex flex-col transition-all duration-300 ${patient.result === 'Critical' ? 'border-red-400 shadow-[0_4px_20px_-5px_rgba(239,68,68,0.2)]' :
                                        patient.result === 'High Risk' ? 'border-orange-400 shadow-[0_4px_20px_-5px_rgba(249,115,22,0.2)]' :
                                            patient.result === 'Stable' ? 'border-emerald-400' : 'border-slate-200'
                                    }`}
                                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                            >
                                {/* Card Header */}
                                <div className={`p-4 border-b flex items-center justify-between ${patient.result === 'Critical' ? 'bg-red-50/80 border-red-100' :
                                    patient.result === 'High Risk' ? 'bg-orange-50/80 border-orange-100' :
                                        patient.result === 'Stable' ? 'bg-emerald-50/80 border-emerald-100' : 'bg-slate-50/80 border-slate-100'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 text-slate-700 font-extrabold rounded-lg shadow-sm border border-slate-100 text-sm">
                                            #{patient.id}
                                        </div>
                                        <span className="font-bold text-slate-700">Patient Data</span>
                                    </div>

                                    {/* Dynamic Status Badge */}
                                    {patient.result && (
                                        <div className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm border ${patient.result === 'Critical' ? 'bg-red-100 text-red-700 border-red-200 shadow-red-500/10' :
                                            patient.result === 'High Risk' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                'bg-emerald-100 text-emerald-700 border-emerald-200'
                                            }`}>
                                            {patient.result === 'Critical' ? <Activity size={12} className="animate-[heartbeat_1s_ease-in-out_infinite]" /> :
                                                patient.result === 'Stable' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                            {patient.result}
                                        </div>
                                    )}
                                </div>

                                {/* Form Fields */}
                                <div className="p-5 flex-1 space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Oxygen (SpO2 %)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 98"
                                            value={patient.oxygen}
                                            onChange={(e) => handleUpdatePatient(index, 'oxygen', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 font-bold focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all placeholder:text-slate-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Heart Rate (BPM)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 85"
                                            value={patient.heartRate}
                                            onChange={(e) => handleUpdatePatient(index, 'heartRate', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 font-bold focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all placeholder:text-slate-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Consciousness</label>
                                        <div className="relative">
                                            <select
                                                value={patient.consciousness}
                                                onChange={(e) => handleUpdatePatient(index, 'consciousness', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 font-bold focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Alert">Alert</option>
                                                <option value="Drowsy">Drowsy</option>
                                                <option value="Unconscious">Unconscious</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
