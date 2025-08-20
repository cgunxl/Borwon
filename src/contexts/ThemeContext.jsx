import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark mode
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('bwn-theme');
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setIsLoaded(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;
    
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    // Save to localStorage
    localStorage.setItem('bwn-theme', theme);
  }, [theme, isLoaded]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Set specific theme
  const setSpecificTheme = (newTheme) => {
    if (['light', 'dark'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setSpecificTheme,
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

