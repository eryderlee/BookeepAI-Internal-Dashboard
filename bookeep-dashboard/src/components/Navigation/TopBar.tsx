import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FolderKanban, 
  BarChart3, 
  Target, 
  CheckSquare, 
  Wrench, 
  FolderOpen, 
  TrendingUp, 
  MessageSquare, 
  FlaskConical, 
  Megaphone,
  Search,
  X,
  Bell
} from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';
import { Button, Icon } from '../UI';

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'KPIs', path: '/kpis', icon: BarChart3 },
    { name: 'Client Pulse', path: '/client-pulse', icon: Target },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Build Tracker', path: '/build-tracker', icon: Wrench },
    { name: 'Assets', path: '/assets', icon: FolderOpen },
    { name: 'Sales', path: '/sales', icon: TrendingUp },
    { name: 'Notes', path: '/notes', icon: MessageSquare },
    { name: 'Experiments', path: '/experiments', icon: FlaskConical },
    { name: 'Announcements', path: '/announcements', icon: Megaphone },
  ];

  return (
    <>
      <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-200">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Logo on mobile */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">BA</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">BookeepAI</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden sm:block lg:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon={Search} size="sm" className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-colors duration-200"
            placeholder="Search projects, tasks, or clients..."
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icon icon={X} size="xs" />
              </button>
            </div>
          )}
        </div>
      </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Team switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <select className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-colors duration-200">
              <option value="main">Main Team</option>
              <option value="development">Development</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Icon icon={Bell} size="md" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:block text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Admin User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">admin@bookeepai.com</div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-medium text-sm">AU</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl">
            {/* Mobile logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">BA</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">BookeepAI</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Internal Dashboard</p>
                </div>
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <Icon icon={item.icon} size="md" className="mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;