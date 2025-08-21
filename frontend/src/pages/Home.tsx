import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { productsApi } from '../services/api';
import { ProductDto } from '../types/product';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productsApi.getAll();
        setFeaturedProducts(products.slice(0, 6)); // Show first 6 products
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const handleAddToCart = (product: ProductDto) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-luxury text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Discover
                <span className="block text-gold-400">Luxury</span>
                <span className="block">Accessories</span>
              </h1>
              <p className="text-xl text-luxury-200 leading-relaxed">
                Elevate your style with our curated collection of premium accessories. 
                From timeless classics to contemporary designs, each piece embodies 
                the perfect blend of elegance and sophistication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-primary text-center group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/register"
                  className="btn-outline text-center"
                >
                  Join VIP
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                      <div className="text-center">
                        <ShoppingCart size={64} className="mx-auto mb-4 text-gold-400" />
                        <p className="text-lg font-medium">Premium Collection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-luxury-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-luxury-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-luxury-600 max-w-2xl mx-auto">
              Discover our handpicked selection of luxury accessories that define 
              contemporary elegance and timeless style.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="h-64 bg-luxury-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-luxury-200 rounded"></div>
                    <div className="h-3 bg-luxury-200 rounded w-2/3"></div>
                    <div className="h-6 bg-luxury-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="card group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-luxury-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gold-600 font-medium uppercase tracking-wide">
                        {product.brand}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < 4 ? 'text-gold-400 fill-current' : 'text-luxury-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-luxury-900 mb-2 group-hover:text-gold-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    
                    <p className="text-luxury-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold-600">
                        ${product.price}
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-gold-600 hover:text-gold-700 font-medium text-sm flex items-center group"
                      >
                        View Details
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="btn-outline text-lg px-8 py-4 group"
            >
              View All Products
              <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-luxury-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-luxury-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service that 
              exceeds your expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Every product is carefully selected and crafted with the finest materials to ensure lasting beauty and durability.",
                icon: "✨"
              },
              {
                title: "Expert Craftsmanship",
                description: "Our accessories are created by skilled artisans who understand the art of luxury and attention to detail.",
                icon: "🎨"
              },
              {
                title: "Exclusive Collection",
                description: "Discover unique pieces that set you apart, curated from the world's most prestigious brands and designers.",
                icon: "💎"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-luxury-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-luxury-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
