import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const navItems = [
    { name: 'Sales', path: '/sales', owner: 'Khan', color: 'emerald' },
    { name: 'Onboarding', path: '/onboarding', owner: 'Sora', color: 'violet' },
    { name: 'Product', path: '/product', owner: 'Eden', color: 'rose' },
    { name: 'Equity Tracker', path: '/equity', owner: '', color: 'blue' },
  ];

  return (
    <nav className="flex items-center">
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex flex-col items-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 ${
                isActive
                  ? `bg-${item.color}-100 text-${item.color}-900 shadow-md`
                  : `text-blue-700 hover:bg-${item.color}-50 hover:text-${item.color}-800`
              }`
            }
          >
            {/* Active indicator line */}
            {({ isActive }) => (
              <>
                <span className="relative z-10">{item.name}</span>
                {item.owner && (
                  <span className="text-xs opacity-70 mt-0.5 relative z-10">({item.owner})</span>
                )}
                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-1/2 h-0.5 bg-${item.color}-500 transition-all duration-300 ${
                    isActive ? 'w-3/4 -translate-x-1/2' : 'w-0 -translate-x-1/2 group-hover:w-1/2'
                  }`}
                />
                {/* Hover background effect */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r from-${item.color}-200/50 to-${item.color}-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;