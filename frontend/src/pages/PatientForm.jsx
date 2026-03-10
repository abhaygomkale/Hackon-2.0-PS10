import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowLeft, Activity, User, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1 mb-1.5">
    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{label}</label>
    <input
      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 shadow-sm"
      {...props}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-1 mb-1.5">
    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select
        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 text-sm font-medium shadow-sm appearance-none cursor-pointer"
        {...props}
      >
        <option value="" disabled>Select</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
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
      setError("Please fill all fields for all patients.");
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
    { num: 2, label: 'Setup' },
    { num: 3, label: 'Data Entry' },
    { num: 4, label: 'Results' }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50/30 font-sans animate-fadeIn pb-6">

      <div className="pt-6 px-4 md:px-6 relative z-10 max-w-[1600px] mx-auto">

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

        {/* Patient Cards Grid - Compact but more separated & visible */}
        <div className={`grid grid-cols-1 gap-8 md:gap-10 w-full mb-12 px-4 md:px-0 ${patients.length > 2 ? 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2' : patients.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'max-w-xl mx-auto'}`}>
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-[0_8px_30px_-10px_rgba(37,99,235,0.12)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-500 border border-slate-100 hover:border-medical-blue/30 border-t-[5px] border-t-medical-blue relative group overflow-hidden animate-fadeIn flex flex-col"
              style={{ animationDelay: `${(index + 2) * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Decorative Animated Card Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:scale-125 transition-transform duration-700 ease-out z-0"></div>

              <div className="px-5 py-4 bg-slate-50/40 border-b border-slate-100/80 flex items-center justify-between relative z-10 transition-colors group-hover:bg-blue-50/30">
                <h2 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2">
                  <div className="bg-blue-100/50 p-1.5 rounded-lg text-medical-blue group-hover:bg-medical-blue group-hover:text-white group-hover:shadow-[0_4px_10px_rgba(37,99,235,0.3)] transition-all duration-300">
                    <User size={18} />
                  </div>
                  Patient {index + 1}
                </h2>
                <div className="text-[10px] items-center flex font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200 group-hover:border-medical-blue/20 group-hover:text-medical-blue transition-colors">
                  #{1000 + index}
                </div>
              </div>

              <div className="p-5 flex-1 space-y-5 relative z-10">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="col-span-2">
                    <Input label="Full Name" type="text" placeholder="John Doe" value={patient.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                  </div>
                  <Input label="Age(y)" type="number" placeholder="Y" min="0" max="120" value={patient.age} onChange={(e) => handleInputChange(index, 'age', e.target.value)} />
                  <Select label="Gender" options={['Male', 'Female', 'Other']} value={patient.gender} onChange={(e) => handleInputChange(index, 'gender', e.target.value)} />
                </div>

                {/* Vital Signs in smaller box */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100/80">
                  <h3 className="text-[9px] font-bold text-emergency-red uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Activity size={12} />
                    Vital Signs
                  </h3>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    <Input label="SpO2 (%)" type="number" placeholder="98" min="0" max="100" value={patient.oxygen} onChange={(e) => handleInputChange(index, 'oxygen', e.target.value)} />
                    <Input label="HR (bpm)" type="number" placeholder="75" min="0" max="300" value={patient.heart_rate} onChange={(e) => handleInputChange(index, 'heart_rate', e.target.value)} />
                    <Input label="BP Sys" type="number" placeholder="120" min="0" max="300" value={patient.blood_pressure_sys} onChange={(e) => handleInputChange(index, 'blood_pressure_sys', e.target.value)} />
                    <Input label="BP Dia" type="number" placeholder="80" min="0" max="200" value={patient.blood_pressure_dia} onChange={(e) => handleInputChange(index, 'blood_pressure_dia', e.target.value)} />
                    <div className="col-span-2">
                      <Input label="Temp (°C)" type="number" step="0.1" placeholder="37.0" value={patient.temperature} onChange={(e) => handleInputChange(index, 'temperature', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Patient Condition */}
                <div>
                  <h3 className="text-[9px] font-bold text-medical-blue uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Wind size={12} />
                    Status
                  </h3>
                  <Select label="Consciousness" options={['Alert', 'Drowsy', 'Unconscious']} value={patient.consciousness} onChange={(e) => handleInputChange(index, 'consciousness', e.target.value)} />
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Symptoms</label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all bg-slate-50 focus:bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 shadow-sm resize-none"
                      rows="2"
                      placeholder="Chest pain, dizziness..."
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
          <div className="flex justify-center mb-6 px-4">
            <div className="bg-red-50 text-emergency-red px-5 py-3 rounded-lg flex items-center gap-2 border border-red-100 font-bold shadow-sm animate-fadeIn max-w-xl w-full text-sm">
              <AlertTriangle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-10 px-4">
          <button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 text-sm hover:shadow-sm disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-medical-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-90 disabled:hover:scale-100 text-sm sm:min-w-[200px]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing Data...</span>
              </>
            ) : (
              <>
                <span>Analyze with AI</span>
                <Activity size={16} className="animate-pulse" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
