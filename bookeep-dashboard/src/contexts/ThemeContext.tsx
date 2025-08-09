import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Handle potential localStorage access issues
    try {
      const saved = localStorage.getItem('bookeepai-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    
    // Fallback to system preference or light mode
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('Failed to read system theme preference:', error);
      return 'light';
    }
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log(`Toggling theme from ${prev} to ${newTheme}`);
      return newTheme;
    });
  }, []);

  // Initial DOM synchronization and theme persistence
  useEffect(() => {
    console.log(`Theme effect running: ${theme}`);
    
    // Update DOM class immediately
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Added dark class to document element');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class from document element');
    }
    
    // Update localStorage
    try {
      localStorage.setItem('bookeepai-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      try {
        const savedTheme = localStorage.getItem('bookeepai-theme');
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
          console.log(`System theme changed to: ${e.matches ? 'dark' : 'light'}`);
        }
      } catch (error) {
        console.warn('Failed to handle system theme change:', error);
      }
    };

    // Add listener for system theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};