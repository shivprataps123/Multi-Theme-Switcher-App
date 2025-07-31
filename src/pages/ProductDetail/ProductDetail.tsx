import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';
import { Product } from '../../store/slices/productsSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

/**
 * ProductDetail page component
 * Displays detailed product information with theme-specific styling
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  /**
   * Find product by ID when products are loaded
   */
  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  /**
   * Format price to display with currency
   * @param price - Product price
   */
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  /**
   * Handle quantity change
   * @param newQuantity - New quantity value
   */
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  /**
   * Handle add to cart
   */
  const handleAddToCart = () => {
    if (product) {
      // In a real app, you'd dispatch an action to add to cart
      alert(`Added ${quantity} ${product.title} to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link
          to="/"
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700'}
            ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600'}
            ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500'}
          `}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`
      max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8
      ${currentTheme === 'theme-2' && 'flex min-h-screen'}
    `}>
      {/* Theme 2 Sidebar */}
      {currentTheme === 'theme-2' && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-theme2-primary p-6 border-r border-theme2-accent"
        >
          <h2 className="text-2xl font-bold text-theme2-text mb-6">Product Info</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-theme2-text">Category</h3>
              <p className="text-sm text-theme2-text/70">{product.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-theme2-text">Rating</h3>
              <p className="text-sm text-theme2-text/70">{product.rating.rate} / 5 ({product.rating.count} reviews)</p>
            </div>
            <div>
              <h3 className="font-semibold text-theme2-text">Price</h3>
              <p className="text-sm text-theme2-accent font-bold">{formatPrice(product.price)}</p>
            </div>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <div className={currentTheme === 'theme-2' ? 'flex-1 p-8' : 'space-y-8'}>
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            to="/"
            className={`
              hover:underline
              ${currentTheme === 'theme-1' && 'text-gray-600 hover:text-gray-900'}
              ${currentTheme === 'theme-2' && 'text-theme2-text/70 hover:text-theme2-text'}
              ${currentTheme === 'theme-3' && 'text-theme3-text/70 hover:text-theme3-text'}
            `}
          >
            Home
          </Link>
          <span className={currentTheme === 'theme-1' ? 'text-gray-400' : 'text-gray-500'}>/</span>
          <span
            className={`
              ${currentTheme === 'theme-1' && 'text-gray-900'}
              ${currentTheme === 'theme-2' && 'text-theme2-text'}
              ${currentTheme === 'theme-3' && 'text-theme3-text'}
            `}
          >
            {product.title}
          </span>
        </nav>

        {/* Product Details */}
        <div className={`
          grid lg:grid-cols-2 gap-12
          ${currentTheme === 'theme-3' && 'bg-theme3-secondary p-8 rounded-2xl'}
        `}>
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`
              relative overflow-hidden rounded-lg
              ${currentTheme === 'theme-1' && 'bg-gray-100'}
              ${currentTheme === 'theme-2' && 'bg-theme2-primary'}
              ${currentTheme === 'theme-3' && 'bg-theme3-primary'}
            `}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain p-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
              }}
            />
            
            {/* Category Badge */}
            <div className={`
              absolute top-4 left-4 px-3 py-1 text-sm font-medium rounded-full
              ${currentTheme === 'theme-1' && 'bg-blue-100 text-blue-800'}
              ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white'}
              ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white'}
            `}>
              {product.category}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1
                className={`
                  text-3xl font-bold mb-4
                  ${currentTheme === 'theme-1' && 'text-theme1-text'}
                  ${currentTheme === 'theme-2' && 'text-theme2-text font-serif'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
                `}
              >
                {product.title}
              </h1>
              <p
                className={`
                  text-lg leading-relaxed
                  ${currentTheme === 'theme-1' && 'text-gray-600'}
                  ${currentTheme === 'theme-2' && 'text-theme2-text/80'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
                `}
              >
                {product.description}
              </p>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-3xl font-bold
                  ${currentTheme === 'theme-1' && 'text-theme1-text'}
                  ${currentTheme === 'theme-2' && 'text-theme2-accent'}
                  ${currentTheme === 'theme-3' && 'text-theme3-accent'}
                `}
              >
                {formatPrice(product.price)}
              </span>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating.rate) ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span
                  className={`
                    text-sm
                    ${currentTheme === 'theme-1' && 'text-gray-600'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
                  `}
                >
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label
                className={`
                  block text-sm font-medium
                  ${currentTheme === 'theme-1' && 'text-gray-700'}
                  ${currentTheme === 'theme-2' && 'text-theme2-text'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text'}
                `}
              >
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`
                    w-10 h-10 rounded-lg border flex items-center justify-center
                    ${currentTheme === 'theme-1' && 'border-gray-300 hover:bg-gray-50 disabled:opacity-50'}
                    ${currentTheme === 'theme-2' && 'border-theme2-accent/20 hover:bg-theme2-accent/10 disabled:opacity-50'}
                    ${currentTheme === 'theme-3' && 'border-theme3-accent hover:bg-theme3-accent/10 disabled:opacity-50'}
                  `}
                >
                  -
                </button>
                <span
                  className={`
                    w-16 text-center font-medium
                    ${currentTheme === 'theme-1' && 'text-theme1-text'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text'}
                  `}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={`
                    w-10 h-10 rounded-lg border flex items-center justify-center
                    ${currentTheme === 'theme-1' && 'border-gray-300 hover:bg-gray-50 disabled:opacity-50'}
                    ${currentTheme === 'theme-2' && 'border-theme2-accent/20 hover:bg-theme2-accent/10 disabled:opacity-50'}
                    ${currentTheme === 'theme-3' && 'border-theme3-accent hover:bg-theme3-accent/10 disabled:opacity-50'}
                  `}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`
                w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors duration-200
                ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700'}
                ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600'}
                ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500'}
              `}
            >
              Add to Cart - {formatPrice(product.price * quantity)}
            </motion.button>

            {/* Additional Info */}
            {currentTheme !== 'theme-2' && (
              <div className={`
                p-6 rounded-lg space-y-4
                ${currentTheme === 'theme-1' && 'bg-gray-50'}
                ${currentTheme === 'theme-3' && 'bg-theme3-primary'}
              `}>
                <h3
                  className={`
                    font-semibold
                    ${currentTheme === 'theme-1' && 'text-theme1-text'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text'}
                  `}
                >
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span>
                    <span className="ml-2">{product.rating.rate}/5</span>
                  </div>
                  <div>
                    <span className="font-medium">Reviews:</span>
                    <span className="ml-2">{product.rating.count}</span>
                  </div>
                  <div>
                    <span className="font-medium">Price:</span>
                    <span className="ml-2">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 