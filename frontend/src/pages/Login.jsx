import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Activity, ArrowRight } from 'lucide-react';

export default function Login() {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (doctorId && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background elements */}
      <div 
        style={{ 
          position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', 
          background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)', 
          borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 
        }} 
      />
      <div 
        style={{ 
          position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', 
          background: 'radial-gradient(circle, rgba(0,255,150,0.1) 0%, transparent 70%)', 
          borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 
        }} 
      />

      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem', zIndex: 1, position: 'relative' }}>
        <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '2.5rem' }}>
          <div className="glass-card flex-center" style={{ width: '64px', height: '64px', borderRadius: '1rem', marginBottom: '1.5rem', background: 'rgba(0, 102, 255, 0.1)' }}>
            <Activity size={32} color="hsl(var(--primary))" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>AI Triage Assistant</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', fontSize: '0.9rem' }}>Enter your credentials to access the emergency dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="animate-fade-in delay-100" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }}>
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Doctor ID / Staff Email" 
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          <div className="animate-fade-in delay-200" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }}>
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          <div className="animate-fade-in delay-300" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginTop: '-0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Remember me
            </label>
            <a href="#" style={{ color: 'hsl(var(--primary))', fontWeight: '500' }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary animate-fade-in delay-300" style={{ marginTop: '1rem', width: '100%', padding: '0.85rem' }}>
            Access Dashboard <ArrowRight size={18} />
          </button>
        </form>

        <div className="animate-fade-in delay-300" style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          <p>Secure connection established</p>
          <p>v1.0.0-beta</p>
        </div>
      </div>
    </div>
  );
}
