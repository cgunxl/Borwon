import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-surface-2 rounded-full p-1 transition-all duration-300 hover:bg-surface-1 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-deep group"
      aria-label={`เปลี่ยนเป็นโหมด${theme === 'dark' ? 'สว่าง' : 'มืด'}`}
    >
      {/* Toggle Track */}
      <div className="relative w-full h-full">
        {/* Toggle Handle */}
        <div
          className={`absolute top-0 w-4 h-4 bg-gradient-to-br from-accent-primary to-accent-aqua rounded-full transition-all duration-300 transform ${
            theme === 'light' ? 'translate-x-6' : 'translate-x-0'
          } shadow-glow group-hover:shadow-glow-lg`}
        />
        
        {/* Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <Sun 
            className={`w-3 h-3 transition-all duration-300 ${
              theme === 'light' 
                ? 'text-bg-deep opacity-100' 
                : 'text-text-muted opacity-60'
            }`} 
          />
          <Moon 
            className={`w-3 h-3 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-accent-primary opacity-100' 
                : 'text-text-muted opacity-60'
            }`} 
          />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-accent-primary/0 transition-all duration-300 group-hover:bg-accent-primary/10" />
    </button>
  );
};

export default ThemeToggle;

