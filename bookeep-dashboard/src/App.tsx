import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Projects from './pages/Projects';
import KPIs from './pages/KPIs';
import ClientPulse from './pages/ClientPulse';
import Tasks from './pages/Tasks';
import BuildTracker from './pages/BuildTracker';
import Assets from './pages/Assets';
import Sales from './pages/Sales';
import Notes from './pages/Notes';
import Experiments from './pages/Experiments';
import Announcements from './pages/Announcements';
import Onboarding from './pages/Onboarding';
import Product from './pages/Product';
import EquityTracker from './pages/EquityTracker';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="kpis" element={<KPIs />} />
            <Route path="client-pulse" element={<ClientPulse />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="build-tracker" element={<BuildTracker />} />
            <Route path="assets" element={<Assets />} />
            <Route path="sales" element={<Sales />} />
            <Route path="notes" element={<Notes />} />
            <Route path="experiments" element={<Experiments />} />
            <Route path="announcements" element={<Announcements />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="product" element={<Product />} />
            <Route path="equity" element={<EquityTracker />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
