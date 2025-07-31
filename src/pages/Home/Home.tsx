import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../../store/index';
import { fetchProducts, Product } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

/**
 * Home page component
 * Displays products in a theme-specific layout with API integration
 */
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const products = useSelector((state: RootState) => (state.products as any).items || []);
  const loading = useSelector((state: RootState) => (state.products as any).loading || false);
  const error = useSelector((state: RootState) => (state.products as any).error || null);
  
  // Category filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  /**
   * Fetch products on component mount
   */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /**
   * Extract unique categories from products
   */
  useEffect(() => {
    if (products.length > 0) {
      const categories = Array.from(new Set(products.map((product: Product) => product.category as string))) as string[];
      setAvailableCategories(['All', ...categories]);
    }
  }, [products]);

  /**
   * Filter products by selected category
   */
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter((product: Product) => (product.category as string) === selectedCategory);

  /**
   * Handle category selection
   */
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`
      ${currentTheme === 'theme-1' && 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
      ${currentTheme === 'theme-2' && 'flex min-h-screen'}
      ${currentTheme === 'theme-3' && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
    `}>
      {/* Theme 2 Sidebar */}
      {currentTheme === 'theme-2' && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-theme2-primary p-6 border-r border-theme2-accent"
        >
          <h2 className="text-2xl font-bold text-theme2-text mb-6">Categories</h2>
          <nav className="space-y-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`
                  w-full text-left px-3 py-2 rounded transition-colors
                  ${selectedCategory === category 
                    ? 'bg-theme2-accent text-white' 
                    : 'text-theme2-text hover:bg-theme2-accent/20'
                  }
                `}
              >
                {category}
                {selectedCategory === category && (
                  <span className="ml-2 text-sm">({filteredProducts.length})</span>
                )}
              </button>
            ))}
          </nav>
          
          {/* Clear Filters Button */}
          {selectedCategory !== 'All' && (
            <button
              onClick={() => handleCategorySelect('All')}
              className="w-full mt-4 px-3 py-2 text-sm text-theme2-text/70 hover:text-theme2-text transition-colors"
            >
              Clear Filters
            </button>
          )}
        </motion.aside>
      )}

      {/* Main Content */}
      <div className={currentTheme === 'theme-2' ? 'flex-1 p-8' : 'space-y-8'}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            text-center mb-8
            ${currentTheme === 'theme-1' && 'space-y-4'}
            ${currentTheme === 'theme-2' && 'space-y-6'}
            ${currentTheme === 'theme-3' && 'space-y-4'}
          `}
        >
          <h1
            className={`
              font-bold
              ${currentTheme === 'theme-1' && 'text-4xl text-theme1-text'}
              ${currentTheme === 'theme-2' && 'text-5xl text-theme2-text font-serif'}
              ${currentTheme === 'theme-3' && 'text-4xl text-theme3-text font-pacifico'}
            `}
          >
            Welcome to Our Store
          </h1>
          <p
            className={`
              max-w-2xl mx-auto
              ${currentTheme === 'theme-1' && 'text-lg text-gray-600'}
              ${currentTheme === 'theme-2' && 'text-xl text-theme2-text/80'}
              ${currentTheme === 'theme-3' && 'text-lg text-theme3-text/80'}
            `}
          >
            Discover amazing products with our beautiful theme switcher. 
            Each theme offers a unique shopping experience!
          </p>
          
          {/* Category Filter Display for Theme 1 and 3 */}
          {currentTheme !== 'theme-2' && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                    ${currentTheme === 'theme-3' && selectedCategory === category 
                      ? 'bg-theme3-accent text-white' 
                      : 'bg-theme3-secondary text-theme3-text hover:bg-theme3-accent/20'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-red-600 text-lg mb-4">Error loading products</div>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`
              ${currentTheme === 'theme-1' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}
              ${currentTheme === 'theme-2' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}
              ${currentTheme === 'theme-3' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'}
            `}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className={`
                col-span-full text-center py-12
                ${currentTheme === 'theme-1' && 'text-gray-600'}
                ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
                ${currentTheme === 'theme-3' && 'text-theme3-text/70'}
              `}>
                <p className="text-lg mb-4">No products found in this category.</p>
                <button
                  onClick={() => handleCategorySelect('All')}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors
                    ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700'}
                    ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600'}
                    ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500'}
                  `}
                >
                  View All Products
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              className={`
                px-8 py-3 rounded-lg font-medium transition-all duration-200
                ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700'}
                ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600'}
                ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500'}
              `}
            >
              View All Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home; 