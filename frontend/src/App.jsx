import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PatientSetupPage from './pages/PatientSetupPage';
import PatientForm from './pages/PatientForm';
import Triage from './pages/Triage';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PatientSetupPage />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
