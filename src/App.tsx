import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from './store/index';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ProductDetail from './pages/ProductDetail/ProductDetail';

/**
 * Main App component
 * Handles theme switching, routing, and overall layout
 */
const App: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  /**
   * Apply theme class to body element for global styling
   */
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('theme-1', 'theme-2', 'theme-3');
    // Add current theme class
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${currentTheme}`}>
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentTheme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-16"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default App; 