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
    
    // Update DOM class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to document element');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from document element');
    }
    
    // Update localStorage
    try {
      localStorage.setItem('bookeepai-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

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