import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-8 rounded-full transition-all duration-300 ease-in-out
        ${isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600' 
          : 'bg-gradient-to-r from-blue-400 to-blue-500 border border-blue-300'
        }
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode ? 'focus:ring-gray-500' : 'focus:ring-blue-400'}
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`
          absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${isDarkMode 
            ? 'left-1 bg-gray-200 text-gray-800' 
            : 'left-7 bg-white text-yellow-500'
          }
          shadow-lg
        `}
      >
        {isDarkMode ? (
          <Moon size={14} className="transition-transform duration-300" />
        ) : (
          <Sun size={14} className="transition-transform duration-300 rotate-180" />
        )}
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun 
          size={12} 
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30 text-gray-400' : 'opacity-0'
          }`} 
        />
        <Moon 
          size={12} 
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-30 text-white'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;

