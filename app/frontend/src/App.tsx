import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpatialDashboard } from './layouts/SpatialDashboard';
import { AIBoardroom } from './components/AIBoardroom';
import { CreatorStudio } from './pages/CreatorStudio';
import { FinanceStudio } from './pages/FinanceStudio';
import { OperationsStudio } from './pages/OperationsStudio';

// Placeholder Pages
const Overview = () => <div className="p-6 bg-white rounded-xl shadow-sm border"><h2 className="text-2xl font-bold mb-4">Workspace Overview</h2><p>Welcome to your active organization. Select a studio to begin.</p></div>;
const HRStudio = () => <div className="p-6 bg-white rounded-xl shadow-sm border"><h2 className="text-2xl font-bold mb-4">HR Studio</h2><p>Recruiting and Payroll loading...</p></div>;
const TechSupport = () => <div className="p-6 bg-white rounded-xl shadow-sm border"><h2 className="text-2xl font-bold mb-4">Tech & Support</h2><p>System health loading...</p></div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpatialDashboard />}>
          <Route index element={<Overview />} />
          <Route path="creator" element={<CreatorStudio />} />
          <Route path="finance" element={<FinanceStudio />} />
          <Route path="operations" element={<OperationsStudio />} />
          <Route path="hr" element={<HRStudio />} />
          <Route path="tech" element={<TechSupport />} />
        </Route>
        {/* Full-screen isolated Boardroom */}
        <Route path="/boardroom" element={<AIBoardroom />} />
      </Routes>
    </BrowserRouter>
  );
}
