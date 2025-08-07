import { Outlet } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Top header with logo */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">BookeepAI</h1>
                <p className="text-xs text-blue-600/70">Internal Dashboard</p>
              </div>
            </div>
            <NavBar />
          </div>
        </div>
        
        {/* Animated sliding bar */}
        <div className="absolute bottom-0 left-0 w-full h-0.5">
          <div className="h-full w-40 bg-gradient-to-r from-transparent via-blue-300/50 via-blue-400 via-blue-500 via-blue-600 via-blue-500/50 to-transparent shadow-lg shadow-blue-400/30 animate-slide-infinite blur-[0.5px]"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;