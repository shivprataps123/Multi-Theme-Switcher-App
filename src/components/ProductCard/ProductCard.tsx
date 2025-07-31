import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';
import { Product } from '../../store/slices/productsSlice';

/**
 * ProductCard component props interface
 */
interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component
 * Displays product information with theme-specific styling
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  /**
   * Format price to display with currency
   * @param price - Product price
   */
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  /**
   * Truncate text to specified length
   * @param text - Text to truncate
   * @param maxLength - Maximum length
   */
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        overflow-hidden transition-all duration-300
        ${currentTheme === 'theme-1' && 'bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-lg'}
        ${currentTheme === 'theme-2' && 'bg-theme2-secondary border border-theme2-accent/20 hover:border-theme2-accent rounded-xl'}
        ${currentTheme === 'theme-3' && 'bg-theme3-primary border-2 border-theme3-accent shadow-lg hover:shadow-xl rounded-2xl'}
      `}
    >
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div className={`
          relative overflow-hidden
          ${currentTheme === 'theme-1' && 'h-48 bg-gray-100'}
          ${currentTheme === 'theme-2' && 'h-56 bg-theme2-primary'}
          ${currentTheme === 'theme-3' && 'h-52 bg-theme3-secondary'}
        `}>
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            }}
          />
          
          {/* Category Badge */}
          <div className={`
            absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded
            ${currentTheme === 'theme-1' && 'bg-blue-100 text-blue-800'}
            ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white'}
            ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white'}
          `}>
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className={`
          p-4 space-y-3
          ${currentTheme === 'theme-1' && 'bg-white'}
          ${currentTheme === 'theme-2' && 'bg-theme2-secondary'}
          ${currentTheme === 'theme-3' && 'bg-theme3-primary'}
        `}>
          {/* Title */}
          <h3
            className={`
              font-semibold line-clamp-2
              ${currentTheme === 'theme-1' && 'text-theme1-text text-sm'}
              ${currentTheme === 'theme-2' && 'text-theme2-text text-lg font-serif'}
              ${currentTheme === 'theme-3' && 'text-theme3-text text-base font-pacifico'}
            `}
          >
            {truncateText(product.title, 60)}
          </h3>

          {/* Description */}
          <p
            className={`
              text-sm line-clamp-2
              ${currentTheme === 'theme-1' && 'text-gray-600'}
              ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
              ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
            `}
          >
            {truncateText(product.description, 100)}
          </p>

          {/* Price and Rating */}
          <div className="flex justify-between items-center">
            <span
              className={`
                font-bold text-lg
                ${currentTheme === 'theme-1' && 'text-theme1-text'}
                ${currentTheme === 'theme-2' && 'text-theme2-accent'}
                ${currentTheme === 'theme-3' && 'text-theme3-accent'}
              `}
            >
              {formatPrice(product.price)}
            </span>
            
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span
                className={`
                  text-sm
                  ${currentTheme === 'theme-1' && 'text-gray-600'}
                  ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
                `}
              >
                {product.rating.rate}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
              ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700'}
              ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600'}
              ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500'}
            `}
            onClick={(e: React.MouseEvent) => e.preventDefault()}
          >
            Add to Cart
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 