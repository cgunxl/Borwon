import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-bwn-medium-gray rounded-full p-1 transition-all duration-300 hover:bg-bwn-light-gray focus:outline-none focus:ring-2 focus:ring-bwn-accent focus:ring-offset-2 focus:ring-offset-bwn-deep-black"
      aria-label={`เปลี่ยนเป็นโหมด${theme === 'dark' ? 'สว่าง' : 'มืด'}`}
    >
      {/* Toggle Track */}
      <div className="relative w-full h-full">
        {/* Toggle Handle */}
        <div
          className={`absolute top-0 w-4 h-4 bg-bwn-accent rounded-full transition-all duration-300 transform ${
            theme === 'light' ? 'translate-x-6' : 'translate-x-0'
          } shadow-lg`}
        />
        
        {/* Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <Sun 
            className={`w-3 h-3 transition-all duration-300 ${
              theme === 'light' 
                ? 'text-bwn-deep-black opacity-100' 
                : 'text-bwn-white/40 opacity-60'
            }`} 
          />
          <Moon 
            className={`w-3 h-3 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-bwn-white opacity-100' 
                : 'text-bwn-white/40 opacity-60'
            }`} 
          />
        </div>
      </div>

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-full bg-bwn-accent/0 transition-all duration-300 group-hover:bg-bwn-accent/10" />
    </button>
  );
};

export default ThemeToggle;

