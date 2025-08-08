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
  Megaphone 
} from 'lucide-react';
import { Icon } from '../UI';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigationItems = [
    { 
      name: 'Projects', 
      path: '/projects', 
      icon: FolderKanban,
      description: 'Active automation projects' 
    },
    { 
      name: 'KPIs', 
      path: '/kpis', 
      icon: BarChart3,
      description: 'Key performance indicators' 
    },
    { 
      name: 'Client Pulse', 
      path: '/client-pulse', 
      icon: Target,
      description: 'Client satisfaction metrics' 
    },
    { 
      name: 'Tasks', 
      path: '/tasks', 
      icon: CheckSquare,
      description: 'Team task management' 
    },
    { 
      name: 'Build Tracker', 
      path: '/build-tracker', 
      icon: Wrench,
      description: 'Development builds & deployments' 
    },
    { 
      name: 'Assets', 
      path: '/assets', 
      icon: FolderOpen,
      description: 'Templates & resources' 
    },
    { 
      name: 'Sales', 
      path: '/sales', 
      icon: TrendingUp,
      description: 'Sales pipeline & metrics' 
    },
    { 
      name: 'Notes', 
      path: '/notes', 
      icon: MessageSquare,
      description: 'Team communication' 
    },
    { 
      name: 'Experiments', 
      path: '/experiments', 
      icon: FlaskConical,
      description: 'A/B tests & experiments' 
    },
    { 
      name: 'Announcements', 
      path: '/announcements', 
      icon: Megaphone,
      description: 'Company updates' 
    },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col transition-all duration-300 ease-in-out hidden lg:flex`}>
      {/* Logo section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">BA</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">BookeepAI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Internal Dashboard</p>
            </div>
          )}
        </div>
        
        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-3 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 shadow-sm"
        >
          <span className={`text-sm transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}>
            ◀
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={isCollapsed ? item.name : ''}
            className={({ isActive }) =>
              `group flex items-center ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5'} text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-200 group-hover:scale-110 ${isCollapsed ? '' : 'mr-3'}`}>
                  <Icon icon={item.icon} size="md" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {item.description}
                    </div>
                  </div>
                )}
                {isActive && !isCollapsed && (
                  <div className="w-1.5 h-6 bg-primary-500 dark:bg-primary-400 rounded-full ml-2"></div>
                )}
                {isActive && isCollapsed && (
                  <div className="absolute right-0 w-1 h-8 bg-primary-500 dark:bg-primary-400 rounded-l-full"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="All systems operational"></div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;