export default function Dashboard() {
  return (
    <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px' }}>
        <h1 className="text-gradient-primary">Emergency Triage Dashboard</h1>
        <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>42</h2>
          <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Active Patients in Queue</p>
        </div>
      </div>
    </div>
  );
}
