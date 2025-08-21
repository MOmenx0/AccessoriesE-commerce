import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, ShoppingCart, Users, Plus, Edit, Trash2, Eye, 
  Search, Filter, TrendingUp, DollarSign, PackageCheck, UserCheck 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { productsApi, ordersApi } from '../services/api';
import { ProductDto, OrderDto } from '../types/product';
import toast from 'react-hot-toast';
import AddProductModal from '../components/dashboard/AddProductModal';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users }
  ];

  useEffect(() => {
    if (user && user.role === 'Admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsResponse, ordersResponse] = await Promise.all([
        productsApi.getAll(),
        ordersApi.getAll()
      ]);
      setProducts(productsResponse);
      setOrders(ordersResponse);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shippingAddress.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shippingAddress.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate dashboard stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;

  if (!user || user.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onProductAdded={fetchDashboardData}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your e-commerce platform
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2">
            <div className="flex space-x-2">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-luxury-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-luxury-500 dark:hover:text-luxury-400'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        ${totalRevenue.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {totalOrders}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {totalProducts}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pending Orders</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {pendingOrders}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                      <PackageCheck className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-semibold text-luxury-600 dark:text-luxury-400">
                          #{order.orderNumber}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formatDate(order.orderDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Products Management
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="bg-luxury-500 text-white px-4 py-2 rounded-lg hover:bg-luxury-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </motion.button>
                </div>

                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-luxury-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Brand</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Stock</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">{product.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{product.description.substring(0, 50)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-800 dark:text-white">{product.brand}</td>
                          <td className="py-4 px-4 text-gray-800 dark:text-white">{product.category}</td>
                          <td className="py-4 px-4 font-semibold text-luxury-600 dark:text-luxury-400">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-gray-800 dark:text-white">{product.stockQuantity}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.isAvailable 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {product.isAvailable ? 'Available' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Orders Management
                </h3>

                {/* Search and Filters */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-luxury-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-luxury-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-xl font-bold text-luxury-600 dark:text-luxury-400">
                            #{order.orderNumber}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(order.orderDate)}
                          </div>
                          <div className="text-lg font-bold text-gray-800 dark:text-white">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Items</p>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {order.orderItems.length} items
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Shipping</p>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {order.orderItems.slice(0, 3).map(item => (
                            <img
                              key={item.id}
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                          ))}
                          {order.orderItems.length > 3 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              +{order.orderItems.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Users Management
                </h3>
                
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCheck className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Users Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    User management functionality will be implemented here
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
