import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowLeft, Activity, User, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5 mb-2.5">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</label>
    <input
      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium placeholder:text-slate-400 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
      {...props}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-1.5 mb-2.5">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select
        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] appearance-none cursor-pointer"
        {...props}
      >
        <option value="" disabled>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

export default function PatientForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const patientCount = location.state?.patientCount || 1;

  const [patients, setPatients] = useState(
    Array.from({ length: patientCount }, () => ({
      name: '',
      age: '',
      gender: '',
      oxygen: '',
      heart_rate: '',
      blood_pressure_sys: '',
      blood_pressure_dia: '',
      temperature: '',
      consciousness: 'Alert',
      symptom: ''
    }))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedPatients = [...patients];
    updatedPatients[index][field] = value;
    setPatients(updatedPatients);
    if (error) setError('');
  };

  const validateForm = () => {
    for (let i = 0; i < patients.length; i++) {
      const p = patients[i];
      if (!p.name || !p.age || !p.gender || !p.oxygen || !p.heart_rate || !p.blood_pressure_sys || !p.blood_pressure_dia || !p.temperature || !p.symptom) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fill all fields for all patients before continuing.");
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setError('');

    // Navigate to Triage page immediately to show loading there
    // Triage component will handle the backend API call securely
    navigate('/triage', { state: { rawPatients: patients } });
  };

  const steps = [
    { num: 1, label: 'Login' },
    { num: 2, label: 'Patient Setup' },
    { num: 3, label: 'Patient Data Entry' },
    { num: 4, label: 'AI Results' }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50/30 font-sans animate-fadeIn pb-10">

      {/* Background Ornaments */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-300/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="pt-10 px-4 md:px-8 relative z-10">

        {/* Progress Indicator */}
        <div className="flex justify-center items-center mb-16 w-full max-w-3xl mx-auto px-4 mt-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 scale-100 ${step.num === 3 ? 'bg-medical-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110' : step.num < 3 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                  {step.num < 3 ? <CheckCircle size={18} /> : step.num}
                </div>
                <span className={`text-xs mt-3 font-bold absolute -bottom-6 w-max tracking-wide transition-colors ${step.num === 3 ? 'text-medical-blue' : step.num < 3 ? 'text-slate-600' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 -mt-6">
                  <div className={`h-full rounded-full transition-all duration-500 ${step.num < 3 ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-14 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-indigo-800 drop-shadow-sm tracking-tight">
              AI Emergency Triage Assistant
            </h1>
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">
              <HeartPulse className="h-9 w-9 text-emergency-red animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Enter patient vital signs and symptoms for accurate AI-based emergency triage and priority assessment.
          </p>
        </div>

        {/* Patient Cards Grid */}
        <div className={`grid grid-cols-1 gap-8 max-w-[1400px] mx-auto w-full mb-12 ${patients.length > 1 ? 'xl:grid-cols-2' : 'max-w-4xl'}`}>
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] p-6 md:p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] transition-all duration-500 border border-slate-100 border-l-[6px] border-l-medical-blue relative group overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${(index + 2) * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Decorative Card Background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10 opacity-70 group-hover:scale-110 transition-transform duration-700"></div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-colors duration-300">
                    <User size={24} />
                  </div>
                  Patient {index + 1} Details
                </h2>
                <div className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  ID: #{1000 + index}
                </div>
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <span className="w-6 h-[1px] bg-slate-200"></span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3">
                    <div className="md:col-span-2">
                      <Input label="Full Name" type="text" placeholder="John Doe" value={patient.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                    </div>
                    <Input label="Age" type="number" placeholder="Years" min="0" max="120" value={patient.age} onChange={(e) => handleInputChange(index, 'age', e.target.value)} />
                    <div className="md:col-span-3">
                      <Select label="Gender" options={['Male', 'Female', 'Other']} value={patient.gender} onChange={(e) => handleInputChange(index, 'gender', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100/80 group-hover:bg-blue-50/30 transition-colors duration-500">
                  <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Activity size={16} className="text-emergency-red" />
                    Vital Signs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                    <Input label="Oxygen Level (%)" type="number" placeholder="SpO2 (e.g. 98)" min="0" max="100" value={patient.oxygen} onChange={(e) => handleInputChange(index, 'oxygen', e.target.value)} />
                    <Input label="Heart Rate (bpm)" type="number" placeholder="HR (e.g. 75)" min="0" max="300" value={patient.heart_rate} onChange={(e) => handleInputChange(index, 'heart_rate', e.target.value)} />
                    <Input label="BP Systolic" type="number" placeholder="mmHg (e.g. 120)" min="0" max="300" value={patient.blood_pressure_sys} onChange={(e) => handleInputChange(index, 'blood_pressure_sys', e.target.value)} />
                    <Input label="BP Diastolic" type="number" placeholder="mmHg (e.g. 80)" min="0" max="200" value={patient.blood_pressure_dia} onChange={(e) => handleInputChange(index, 'blood_pressure_dia', e.target.value)} />
                    <div className="sm:col-span-2">
                      <Input label="Temperature (°C)" type="number" step="0.1" placeholder="Temp (e.g. 37.0)" value={patient.temperature} onChange={(e) => handleInputChange(index, 'temperature', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Patient Condition */}
                <div>
                  <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Wind size={16} className="text-medical-blue animate-[pulse_3s_ease-in-out_infinite]" />
                    Patient Condition
                  </h3>
                  <Select label="Consciousness Level" options={['Alert', 'Drowsy', 'Unconscious']} value={patient.consciousness} onChange={(e) => handleInputChange(index, 'consciousness', e.target.value)} />
                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Symptoms & Notes</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium placeholder:text-slate-400 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] resize-none"
                      rows="3"
                      placeholder="Describe symptoms such as chest pain, breathing difficulty, dizziness etc."
                      value={patient.symptom}
                      onChange={(e) => handleInputChange(index, 'symptom', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex justify-center mb-8 px-4">
            <div className="bg-red-50 text-emergency-red px-6 py-4 rounded-xl flex items-center gap-3 border border-red-100 font-bold shadow-sm animate-fadeIn max-w-2xl w-full">
              <AlertTriangle size={24} className="shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pb-20 px-4">
          <button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full sm:w-auto hover:shadow-sm disabled:opacity-50"
          >
            <ArrowLeft size={20} />
            Back to Setup
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="relative group flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-medical-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-[0_10px_25px_-8px_rgba(37,99,235,0.6)] hover:shadow-[0_15px_30px_-8px_rgba(37,99,235,0.7)] transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-90 disabled:hover:scale-100 disabled:cursor-wait overflow-hidden w-full sm:w-auto sm:min-w-[280px]"
          >
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="tracking-wide">Analyzing Patient Data...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide">Analyze with AI</span>
                <div className="bg-white/20 p-1 rounded-full group-hover:scale-110 transition-transform">
                  <Activity size={18} className="group-hover:animate-pulse" />
                </div>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
