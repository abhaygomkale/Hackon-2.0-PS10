import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Users, ArrowRight, Settings, AlertTriangle, Activity, X, Zap } from 'lucide-react';
import TopNav from '../components/TopNav';
import SlidingSidebar from '../components/SlidingSidebar';

export default function PatientSetupPage() {
  const [patientCount, setPatientCount] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Emergency Mode State
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!patientCount) {
      setError("Please enter the number of patients.");
      return;
    }

    const count = parseInt(patientCount, 10);
    if (count < 1 || count > 20) {
      setError("Please enter a valid number between 1 and 20.");
      return;
    }

    // Add a small delay for animation effect before navigating
    setTimeout(() => {
      // Navigate to normal form or emergency multi-form based on mode
      if (isEmergencyMode) {
        navigate("/emergency-form", { state: { patientCount: count } });
      } else {
        navigate("/patient-form", { state: { patientCount: count } });
      }
    }, 300);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <TopNav toggleSidebar={() => setSidebarOpen(true)} />
      <SlidingSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className={`min-h-screen w-full flex items-center justify-center p-4 pt-20 relative overflow-hidden font-sans transition-colors duration-1000 ${isEmergencyMode ? 'bg-red-50' : 'bg-[#f8fafc]'}`}>

        {/* Animated Background Elements */}
        {isEmergencyMode ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-500/20 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_2s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-400/20 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_3s_ease-in-out_infinite]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-red-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite]"></div>
          </>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none"></div>

        <div className={`backdrop-blur-xl w-full max-w-xl rounded-[2rem] overflow-hidden border relative z-10 transform duration-500 transition-all ${isEmergencyMode
            ? 'bg-rose-50/90 shadow-[0_20px_70px_-15px_rgba(225,29,72,0.3)] border-red-200 ring-2 ring-red-500/20'
            : 'bg-white/80 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] border-white/50 hover:shadow-[0_20px_70px_-15px_rgba(37,99,235,0.25)]'
          }`}>

          {/* Top Decorative Bar */}
          <div className={`h-2 w-full bg-[length:200%_auto] animate-[gradient_3s_ease_infinite] ${isEmergencyMode ? 'bg-gradient-to-r from-red-600 via-rose-400 to-red-600' : 'bg-gradient-to-r from-medical-blue via-blue-400 to-medical-blue'
            }`}></div>

          {/* Emergency Scan Button Toggle */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setIsEmergencyMode(!isEmergencyMode)}
              className={`group flex items-center gap-2 text-white px-4 py-2 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 ${isEmergencyMode
                  ? 'bg-slate-700 hover:bg-slate-800 shadow-md'
                  : 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_4px_15px_-3px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_20px_-3px_rgba(225,29,72,0.6)]'
                }`}
            >
              <Zap size={16} className={!isEmergencyMode ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""} />
              <span className="text-sm">{isEmergencyMode ? "Cancel Emergency" : "Emergency Scan"}</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="p-10 text-center pb-8">
            <div className="flex justify-center mb-6 relative group cursor-default">
              <div className={`absolute inset-0 rounded-[2rem] blur-xl opacity-50 transition-opacity duration-500 ${isEmergencyMode ? 'bg-red-200 group-hover:opacity-100' : 'bg-blue-100 group-hover:opacity-100'}`}></div>
              <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-inner relative border border-white shrink-0 transition-transform duration-500 group-hover:scale-105 ${isEmergencyMode ? 'bg-gradient-to-br from-red-50 to-rose-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'
                }`}>
                {isEmergencyMode
                  ? <Activity className="h-10 w-10 text-red-600 animate-[heartbeat_1s_ease-in-out_infinite]" strokeWidth={2} />
                  : <HeartPulse className="h-10 w-10 text-medical-blue animate-[pulse_2s_ease-in-out_infinite]" strokeWidth={2} />
                }
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-3 tracking-tight">
              {isEmergencyMode ? "Emergency Override" : "Triage Assistant"}
            </h1>
            <p className="text-slate-500 text-[0.95rem] font-medium max-w-[280px] mx-auto leading-relaxed">
              {isEmergencyMode ? "Initialize fast multi-patient critical evaluation grid" : "Initialize AI-driven emergency protocol"}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="px-10 pb-10">

            {/* Input Card */}
            <div
              className={`rounded-2xl p-6 shadow-sm border transition-all duration-300 relative overflow-hidden ${isEmergencyMode
                  ? 'bg-red-50/50 border-red-200 hover:border-red-300 hover:shadow-md'
                  : `bg-white ${error ? 'border-red-200 bg-red-50/30' : 'border-slate-100 hover:border-blue-100 hover:shadow-md'}`
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Subtle highlight effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-[200%]' : ''}`}></div>

              <label htmlFor="patientCount" className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
                {isEmergencyMode ? <AlertTriangle size={16} className="text-red-500 animate-[pulse_2s_ease-in-out_infinite]" /> : <Users size={16} className="text-medical-blue" />}
                {isEmergencyMode ? "Critical Patients Count" : "Incoming Patients"}
              </label>

              <div className="relative group">
                <input
                  id="patientCount"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="0"
                  value={patientCount}
                  onChange={(e) => {
                    setPatientCount(e.target.value);
                    setError('');
                  }}
                  className={`w-full text-4xl font-bold px-6 py-5 rounded-xl border-2 transition-all text-center focus:outline-none focus:bg-white
                    ${isEmergencyMode
                      ? 'text-red-700 bg-red-50/50 border-red-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 placeholder:text-red-300'
                      : 'text-slate-800 bg-slate-50/50 border-slate-100 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 placeholder:text-slate-300'
                    }`}
                />
                {/* Floating max indicator */}
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded-md shadow-sm border pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity ${isEmergencyMode ? 'text-red-500 border-red-200 bg-red-50' : 'text-slate-400 bg-white border-slate-100'
                  }`}>
                  Max 20
                </div>
              </div>

              {error ? (
                <p className="text-emergency-red text-sm mt-3 font-semibold flex items-center justify-center gap-1.5 animate-[fadeIn_0.3s_ease-out]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emergency-red animate-pulse"></span>
                  {error}
                </p>
              ) : (
                <p className={`text-xs font-medium text-center mt-3 h-5 ${isEmergencyMode ? 'text-red-400' : 'text-slate-400'}`}>
                  {isEmergencyMode ? 'Ready for multi-patient fast scan overrides' : 'Ready for input'}
                </p>
              )}
            </div>

            {/* Info Pill */}
            <div className={`mt-6 rounded-full p-1 pl-1.5 pr-4 flex items-center gap-3 border shadow-inner transition-colors ${isEmergencyMode ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200/60' : 'bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-100/60'
              }`}>
              <div className="bg-white rounded-full p-2 shadow-sm">
                {isEmergencyMode
                  ? <Activity className="text-red-500 h-4 w-4 animate-[pulse_1s_linear_infinite]" />
                  : <Settings className="text-medical-blue h-4 w-4 animate-[spin_4s_linear_infinite]" />
                }
              </div>
              <p className={`text-[0.8rem] font-medium ${isEmergencyMode ? 'text-red-600/80' : 'text-blue-900/70'}`}>
                {isEmergencyMode ? "EMERGENCY: Rapid Triage Evaluator Engaged." : "System active: AI analysis routing ready."}
              </p>
            </div>

            {/* Action Area */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleGenerate}
                className={`group relative w-full flex items-center justify-center gap-2 text-white font-bold text-[0.95rem] py-4 px-6 rounded-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden ${isEmergencyMode
                    ? 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_8px_20px_-6px_rgba(225,29,72,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(225,29,72,0.5)]'
                    : 'bg-gradient-to-r from-medical-blue to-blue-600 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.5)]'
                  }`}
              >
                {/* Shine effect on button */}
                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>

                <span className="relative z-10">{isEmergencyMode ? "Initialize Emergency Grid" : "Initialize Triage Grid"}</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-semibold text-sm py-3 px-6 rounded-xl transition-colors duration-200 border border-transparent hover:border-slate-200"
              >
                Return to Login
              </button>
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
