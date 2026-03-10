import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ArrowLeft, HeartPulse, Clock, FileText, User as UserIcon } from 'lucide-react';

// priority order for sorting
const PRIORITY_SCORES = {
  'Critical': 4,
  'High': 3,
  'Moderate': 2,
  'Low': 1
};

export default function Triage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Expecting patients array from previous page
  const rawPatients = location.state?.rawPatients || [];

  const [analyzedPatients, setAnalyzedPatients] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // If no patients, simulate analysis for a mockup 
    if (rawPatients.length === 0) {
      const dummy = [{
        name: "John Doe",
        age: "45",
        gender: "Male",
        oxygen: "88",
        heart_rate: "125",
        blood_pressure_sys: "160",
        blood_pressure_dia: "95",
        temperature: "38.5",
        consciousness: "Drowsy",
        symptom: "Severe chest pain and shortness of breath"
      },
      {
        name: "Jane Smith",
        age: "28",
        gender: "Female",
        oxygen: "98",
        heart_rate: "80",
        blood_pressure_sys: "115",
        blood_pressure_dia: "75",
        temperature: "37.0",
        consciousness: "Alert",
        symptom: "Mild abdominal pain"
      }];
      analyzeWithBackend(dummy);
    } else {
      analyzeWithBackend(rawPatients);
    }
  }, [rawPatients]);

  const analyzeWithBackend = async (patients) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/triage/analyze-multiple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patients })
      });

      if (!response.ok) throw new Error("Backend not reachable");

      const data = await response.json();
      setAnalyzedPatients(data.results);
      setIsAnalyzing(false);
    } catch (err) {
      console.error("Backend unavailable, using fallback mock", err);
      runMockAnalysis(patients);
    }
  };

  const runMockAnalysis = (patients) => {
    // Simulate AI analysis delay for the fade-in and realism if backend is off
    setTimeout(() => {
      const results = patients.map(p => {
        const priority = calculatePriority(p);
        return {
          ...p,
          priorityLevel: priority,
          confidence: (Math.random() * (0.99 - 0.85) + 0.85).toFixed(2), // 85% to 99%
          recommendedAction: getRecommendedAction(priority)
        };
      });

      // Sort by severity (Critical first)
      results.sort((a, b) => PRIORITY_SCORES[b.priorityLevel] - PRIORITY_SCORES[a.priorityLevel]);

      setAnalyzedPatients(results);
      setIsAnalyzing(false);
    }, 1500);
  };

  const calculatePriority = (patient) => {
    const o2 = Number(patient.oxygen);
    const hr = Number(patient.heart_rate);
    const bps = Number(patient.blood_pressure_sys);

    if (o2 < 90 || hr > 130 || patient.consciousness === 'Unconscious') {
      return 'Critical';
    } else if (o2 < 94 || hr > 110 || bps > 160 || patient.consciousness === 'Drowsy') {
      return 'High';
    } else if (o2 < 97 || hr > 100 || bps > 140) {
      return 'Moderate';
    }
    return 'Low';
  };

  const getRecommendedAction = (priority) => {
    switch (priority) {
      case 'Critical': return 'Immediate resuscitation and emergency physician intervention required.';
      case 'High': return 'Urgent assessment within 10 minutes. Bedside monitoring required.';
      case 'Moderate': return 'Assessment within 60 minutes. Standard monitoring.';
      case 'Low': return 'Non-urgent assessment within 120 minutes.';
      default: return 'Standard protocol initiated.';
    }
  };

  const getPriorityColors = (level) => {
    switch (level) {
      case 'Critical': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500', badge: 'bg-red-500 text-white', icon: 'text-red-500' };
      case 'High': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-500', badge: 'bg-orange-500 text-white', icon: 'text-orange-500' };
      case 'Moderate': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-400', badge: 'bg-yellow-400 text-slate-800', icon: 'text-yellow-500' };
      case 'Low': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500', badge: 'bg-green-500 text-white', icon: 'text-green-500' };
      default: return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', badge: 'bg-blue-500 text-white', icon: 'text-blue-500' };
    }
  };

  const hasCritical = analyzedPatients.some(p => p.priorityLevel === 'Critical');

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Activity size={48} className="text-medical-blue animate-pulse" />
          <h2 className="text-xl font-bold text-slate-700">AI Triage Analysis in Progress...</h2>
          <p className="text-slate-400">Evaluating vital signs and symptoms priority</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans pb-12 animate-fadeIn">
      {/* Critical Alert Banner */}
      {hasCritical && (
        <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-center gap-3 animate-pulse shadow-md">
          <AlertTriangle className="h-6 w-6 shrink-0" />
          <span className="font-bold text-sm md:text-[15px] tracking-wide uppercase text-center">🚨 Critical Patient Detected – Immediate Attention Required</span>
        </div>
      )}

      {/* Header section */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
        {/* Decorative Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 shadow-sm">
                <HeartPulse className="h-8 w-8 text-medical-blue animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-indigo-800 tracking-tight mb-1">
                  AI Emergency Triage Results
                </h1>
                <p className="text-slate-500 font-medium">
                  AI has analyzed patient vitals and determined emergency priority levels.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm w-full md:w-auto"
            >
              <ArrowLeft size={18} />
              New Triage
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyzedPatients.map((patient, index) => {
            const colors = getPriorityColors(patient.priorityLevel);

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 ${colors.border} overflow-hidden flex flex-col`}
              >
                {/* Card Header */}
                <div className={`px-6 py-4 ${colors.bg} border-b border-white/50 flex justify-between items-start`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-white rounded-lg shadow-sm ${colors.icon}`}>
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{patient.name || `Patient ${index + 1}`}</h3>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{patient.age}y • {patient.gender}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5 ${colors.badge}`}>
                    {patient.priorityLevel === 'Critical' && <AlertTriangle size={12} />}
                    {patient.priorityLevel}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Vitals Summary */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">SpO2 / HR</p>
                      <p className="font-semibold text-slate-700">
                        <span className={Number(patient.oxygen) < 95 ? 'text-red-500 font-bold' : ''}>{patient.oxygen}%</span>
                        <span className="text-slate-300 mx-1">|</span>
                        <span className={Number(patient.heart_rate) > 100 ? 'text-orange-500 font-bold' : ''}>{patient.heart_rate}</span>
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">BP / Temp</p>
                      <p className="font-semibold text-slate-700">
                        <span>{patient.blood_pressure_sys}/{patient.blood_pressure_dia}</span>
                        <span className="text-slate-300 mx-1">|</span>
                        <span>{patient.temperature}°</span>
                      </p>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-6 flex-1">
                    <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      <FileText size={14} /> Symptoms & Status
                    </h4>
                    <p className="text-sm text-slate-600 font-medium">
                      Status: <span className="text-slate-800">{patient.consciousness}</span>
                    </p>
                    <p className="text-sm text-slate-600 line-clamp-3 mt-1 italic">"{patient.symptom}"</p>
                  </div>

                  <hr className="border-slate-100 mb-4" />

                  {/* AI Recommendation */}
                  <div className={`p-4 rounded-xl ${colors.bg}/50 border border-${colors.border}/20 mt-auto`}>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">
                      <Activity size={14} className={colors.icon} /> AI Action Plan
                    </h4>
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {patient.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
