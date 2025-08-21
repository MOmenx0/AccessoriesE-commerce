import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { productsApi } from '../services/api';
import { ProductDto } from '../types/product';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const response = await productsApi.getById(productId);
      setProduct(response);
      setSelectedImage(response.imageUrl);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    // TODO: Implement wishlist functionality
    toast.success(`${product?.name} added to wishlist`);
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-luxury-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Product not found
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-luxury-500 text-white px-6 py-3 rounded-lg hover:bg-luxury-600 transition-colors"
          >
            Back to Products
          </motion.button>
        </div>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-luxury-500 dark:hover:text-luxury-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-2xl cursor-zoom-in"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleImageZoom}
              >
                <img
                  src={`${API_URL}${selectedImage}`}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* Zoom Effect */}
                {showZoom && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{
                      backgroundImage: `url(${API_URL}${selectedImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                    }}
                  />
                )}
              </div>

              {/* Stock Badge */}
              {!product.isAvailable && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === image
                      ? 'border-luxury-500'
                      : 'border-gray-200 dark:border-gray-600 hover:border-luxury-300'
                  }`}
                >
                  <img
                    src={`${API_URL}${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Brand and Category */}
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {product.brand}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">4.8 (124 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-luxury-50 to-gold-50 dark:from-luxury-900/20 dark:to-gold-900/20 p-6 rounded-2xl">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-bold text-luxury-600 dark:text-luxury-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  USD
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Free shipping • Cash on Delivery
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    
                    <span className="w-16 text-center font-semibold text-gray-800 dark:text-white">
                      {quantity}
                    </span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                  
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.stockQuantity} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className="flex-1 bg-gradient-to-r from-luxury-500 to-luxury-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-luxury-600 hover:to-luxury-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToWishlist}
                  className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Heart className="w-6 h-6 text-red-500" />
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Truck className="w-5 h-5 text-luxury-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Worldwide</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Shield className="w-5 h-5 text-luxury-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cash on Delivery</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <RotateCcw className="w-5 h-5 text-luxury-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Easy Returns</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">30 days</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Brand:</span>
                  <span className="ml-2 text-gray-800 dark:text-white font-medium">
                    {product.brand}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Category:</span>
                  <span className="ml-2 text-gray-800 dark:text-white font-medium">
                    {product.category}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Stock:</span>
                  <span className="ml-2 text-gray-800 dark:text-white font-medium">
                    {product.stockQuantity} units
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`ml-2 font-medium ${
                    product.isAvailable 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;