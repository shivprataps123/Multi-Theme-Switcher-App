import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';
import { setTheme } from '../../store/slices/themeSlice';
import { ThemeType } from '../../store/slices/themeSlice';

/**
 * Header component with theme switcher and navigation
 * Features responsive design and smooth animations
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Handle click outside to close dropdowns
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setIsMobileNavOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Close mobile nav when route changes
   */
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  /**
   * Theme options configuration
   */
  const themeOptions: { value: ThemeType; label: string; description: string }[] = [
    { value: 'theme-1', label: 'Theme 1', description: 'Minimalist' },
    { value: 'theme-2', label: 'Theme 2', description: 'Dark Mode' },
    { value: 'theme-3', label: 'Theme 3', description: 'Colorful' },
  ];

  /**
   * Navigation items
   */
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  /**
   * Handle theme change
   * @param theme - Selected theme
   */
  const handleThemeChange = (theme: ThemeType) => {
    dispatch(setTheme(theme));
    setIsDropdownOpen(false);
  };

  /**
   * Check if navigation item is active
   * @param path - Navigation path
   */
  const isActive = (path: string) => location.pathname === path;

  /**
   * Get current page label
   */
  const getCurrentPageLabel = () => {
    const currentItem = navItems.find(item => isActive(item.path));
    return currentItem ? currentItem.label : 'Home';
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${currentTheme === 'theme-1' && 'bg-white/90 backdrop-blur-sm border-b border-gray-200'}
        ${currentTheme === 'theme-2' && 'bg-theme2-secondary/90 backdrop-blur-sm border-b border-theme2-accent'}
        ${currentTheme === 'theme-3' && 'bg-theme3-secondary/90 backdrop-blur-sm border-b border-theme3-accent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`
                text-2xl font-bold
                ${currentTheme === 'theme-1' && 'text-theme1-text'}
                ${currentTheme === 'theme-2' && 'text-theme2-text'}
                ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
              `}
            >
              ThemeApp
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive(item.path) 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                  ${currentTheme === 'theme-2' && 'text-theme2-text hover:text-theme2-accent'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text hover:text-theme3-accent'}
                `}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Dropdown */}
          <div className="md:hidden relative" ref={mobileNavRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg
                transition-all duration-200 font-medium
                ${currentTheme === 'theme-1' && 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                ${currentTheme === 'theme-2' && 'bg-theme2-accent hover:bg-blue-600 text-white'}
                ${currentTheme === 'theme-3' && 'bg-theme3-accent hover:bg-red-500 text-white'}
              `}
            >
              <span>{getCurrentPageLabel()}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isMobileNavOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            {/* Mobile Navigation Menu */}
            {isMobileNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1
                  ${currentTheme === 'theme-1' && 'bg-white border border-gray-200'}
                  ${currentTheme === 'theme-2' && 'bg-theme2-secondary border border-theme2-accent'}
                  ${currentTheme === 'theme-3' && 'bg-theme3-primary border border-theme3-accent'}
                `}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`
                      block w-full text-left px-4 py-2 text-sm transition-colors duration-200
                      ${isActive(item.path) 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'
                      }
                      ${currentTheme === 'theme-2' && 'text-theme2-text hover:bg-theme2-accent/10'}
                      ${currentTheme === 'theme-3' && 'text-theme3-text hover:bg-theme3-accent/10'}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="relative" ref={themeDropdownRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg
                transition-all duration-200 font-medium
                ${currentTheme === 'theme-1' && 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                ${currentTheme === 'theme-2' && 'bg-theme2-accent hover:bg-blue-600 text-white'}
                ${currentTheme === 'theme-3' && 'bg-theme3-accent hover:bg-red-500 text-white'}
              `}
            >
              <span>Theme</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1
                  ${currentTheme === 'theme-1' && 'bg-white border border-gray-200'}
                  ${currentTheme === 'theme-2' && 'bg-theme2-secondary border border-theme2-accent'}
                  ${currentTheme === 'theme-3' && 'bg-theme3-primary border border-theme3-accent'}
                `}
              >
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`
                      w-full text-left px-4 py-2 text-sm transition-colors duration-200
                      ${currentTheme === option.value 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'
                      }
                      ${currentTheme === 'theme-2' && 'text-theme2-texts hover:bg-theme2-accent/10'}
                      ${currentTheme === 'theme-3' && 'text-theme3-text hover:bg-theme3-accent/10'}
                    `}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 