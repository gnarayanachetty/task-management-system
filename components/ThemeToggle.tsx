// components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}