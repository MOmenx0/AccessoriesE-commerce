import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-luxury text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">
                Luxury Accessories
              </h3>
              <p className="text-luxury-200 leading-relaxed max-w-md">
                Discover our curated collection of premium accessories that define elegance and sophistication. 
                From timeless classics to contemporary designs, each piece tells a story of luxury and craftsmanship.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-luxury-200 hover:text-gold-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/products" className="block text-luxury-200 hover:text-gold-400 transition-colors duration-200">
                Products
              </Link>
              <Link to="/login" className="block text-luxury-200 hover:text-gold-400 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="block text-luxury-200 hover:text-gold-400 transition-colors duration-200">
                Register
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gold-400" />
                <span className="text-luxury-200">info@luxuryaccessories.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gold-400" />
                <span className="text-luxury-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gold-400" />
                <span className="text-luxury-200">123 Luxury Ave, Fashion District</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-luxury-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-luxury-300 hover:text-gold-400 transition-colors duration-200"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-luxury-300 hover:text-gold-400 transition-colors duration-200"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-luxury-300 hover:text-gold-400 transition-colors duration-200"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
            <p className="text-luxury-300 text-sm">
              © 2024 Luxury Accessories. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
