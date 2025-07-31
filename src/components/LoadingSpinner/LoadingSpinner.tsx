import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';

/**
 * LoadingSpinner component
 * Displays a themed loading spinner with animation
 */
const LoadingSpinner: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`
          w-12 h-12 border-4 rounded-full
          ${currentTheme === 'theme-1' && 'border-gray-200 border-t-blue-600'}
          ${currentTheme === 'theme-2' && 'border-theme2-secondary border-t-theme2-accent'}
          ${currentTheme === 'theme-3' && 'border-theme3-secondary border-t-theme3-accent'}
        `}
      />
      <p
        className={`
          text-sm font-medium
          ${currentTheme === 'theme-1' && 'text-gray-600'}
          ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
          ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
        `}
      >
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner; 