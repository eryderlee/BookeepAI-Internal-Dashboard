import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Sales from './pages/Sales';
import Onboarding from './pages/Onboarding';
import Product from './pages/Product';
import EquityTracker from './pages/EquityTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/equity" replace />} />
          <Route path="sales" element={<Sales />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="product" element={<Product />} />
          <Route path="equity" element={<EquityTracker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
