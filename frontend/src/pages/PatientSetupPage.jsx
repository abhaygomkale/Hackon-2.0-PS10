import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Info, Users, ArrowRight, Settings } from 'lucide-react';

export default function PatientSetupPage() {
  const [patientCount, setPatientCount] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
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
      navigate("/patient-form", { state: { patientCount: count } });
    }, 300);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-red-400/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-xl w-full max-w-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] overflow-hidden border border-white/50 relative z-10 transform transition-all duration-500 hover:shadow-[0_20px_70px_-15px_rgba(37,99,235,0.25)]">
        
        {/* Top Decorative Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-medical-blue via-blue-400 to-medical-blue bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]"></div>

        {/* Header Section */}
        <div className="p-10 text-center pb-8">
          <div className="flex justify-center mb-6 relative group cursor-default">
            <div className="absolute inset-0 bg-blue-100 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="h-20 w-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[2rem] flex items-center justify-center shadow-inner relative border border-white shrink-0 group-hover:scale-105 transition-transform duration-500">
              <HeartPulse className="h-10 w-10 text-medical-blue animate-[pulse_2s_ease-in-out_infinite]" strokeWidth={2} />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-3 tracking-tight">
            Triage Assistant
          </h1>
          <p className="text-slate-500 text-[0.95rem] font-medium max-w-[280px] mx-auto leading-relaxed">
            Initialize AI-driven emergency protocol
          </p>
        </div>

        {/* Main Content Area */}
        <div className="px-10 pb-10">
          
          {/* Input Card */}
          <div 
            className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 relative overflow-hidden ${error ? 'border-red-200 bg-red-50/30' : 'border-slate-100 hover:border-blue-100 hover:shadow-md'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Subtle highlight effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-[200%]' : ''}`}></div>

            <label htmlFor="patientCount" className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              <Users size={16} className="text-medical-blue" />
              Incoming Patients
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
                className="w-full text-4xl font-bold text-slate-800 bg-slate-50/50 px-6 py-5 rounded-xl border-2 border-slate-100 focus:outline-none focus:border-medical-blue focus:bg-white focus:ring-4 focus:ring-medical-blue/10 transition-all placeholder:text-slate-300 text-center"
              />
              {/* Floating max indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                Max 20
              </div>
            </div>

            {error ? (
              <p className="text-emergency-red text-sm mt-3 font-semibold flex items-center justify-center gap-1.5 animate-[fadeIn_0.3s_ease-out]">
                <span className="w-1.5 h-1.5 rounded-full bg-emergency-red animate-pulse"></span>
                {error}
              </p>
            ) : (
              <p className="text-slate-400 text-xs font-medium text-center mt-3 h-5">
                Ready for input
              </p>
            )}
          </div>

          {/* Info Pill */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-full p-1 pl-1.5 pr-4 flex items-center gap-3 border border-blue-100/60 shadow-inner">
             <div className="bg-white rounded-full p-2 shadow-sm">
               <Settings className="text-medical-blue h-4 w-4 animate-[spin_4s_linear_infinite]" />
             </div>
             <p className="text-[0.8rem] text-blue-900/70 font-medium">
               System active: AI analysis routing ready.
             </p>
          </div>

          {/* Action Area */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleGenerate}
              className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-medical-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-[0.95rem] py-4 px-6 rounded-xl shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect on button */}
              <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
              
              <span className="relative z-10">Initialize Triage Grid</span>
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
  );
}
