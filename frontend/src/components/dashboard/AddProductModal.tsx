import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { productsApi } from '../../services/api';
import { CreateProductRequest } from '../../types/product';
import toast from 'react-hot-toast';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onProductAdded }) => {
  const [newProduct, setNewProduct] = useState<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    imageUrl: '',
    additionalImages: [],
    stockQuantity: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewProduct(prev => ({ ...prev, additionalImages: value.split(',').map(img => img.trim()) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productsApi.create(newProduct);
      toast.success('Product added successfully');
      onProductAdded();
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Product</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  value={newProduct.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newProduct.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
              <input
                type="text"
                name="additionalImages"
                placeholder="Additional Images (comma-separated)"
                onChange={handleAdditionalImagesChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-luxury-500 text-white rounded-lg hover:bg-luxury-600"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;
