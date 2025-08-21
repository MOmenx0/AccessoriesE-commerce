import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, XCircle, Eye, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ordersApi } from '../services/api';
import { OrderDto } from '../types/order';
import toast from 'react-hot-toast';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
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

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (order: OrderDto) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your orders and view order history
          </p>
        </motion.div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start shopping to see your orders here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/products'}
              className="bg-luxury-500 text-white px-6 py-3 rounded-lg hover:bg-luxury-600 transition-colors"
            >
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-luxury-600 dark:text-luxury-400">
                        #{order.orderNumber}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Order Date</div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {formatDate(order.orderDate)}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewOrder(order)}
                        className="bg-luxury-500 text-white p-2 rounded-lg hover:bg-luxury-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Order Progress */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Order Progress
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      {[
                        { step: 1, label: 'Order Placed', icon: Package },
                        { step: 2, label: 'Processing', icon: Package },
                        { step: 3, label: 'Shipped', icon: Truck },
                        { step: 4, label: 'Delivered', icon: CheckCircle }
                      ].map((stepInfo, stepIndex) => {
                        const currentStep = getStatusStep(order.status);
                        const isCompleted = currentStep >= stepInfo.step;
                        const isCurrent = currentStep === stepInfo.step;
                        
                        return (
                          <div key={stepInfo.step} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              isCompleted
                                ? 'border-luxury-500 bg-luxury-500 text-white'
                                : isCurrent
                                ? 'border-luxury-500 bg-luxury-100 dark:bg-luxury-900/20 text-luxury-500'
                                : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400'
                            }`}>
                              <stepInfo.icon className="w-6 h-6" />
                            </div>
                            
                            <span className={`text-xs mt-2 text-center transition-colors ${
                              isCompleted
                                ? 'text-luxury-600 dark:text-luxury-400 font-medium'
                                : isCurrent
                                ? 'text-luxury-500 dark:text-luxury-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {stepInfo.label}
                            </span>
                            
                            {stepIndex < 3 && (
                              <div className={`w-16 h-0.5 mt-2 transition-all duration-300 ${
                                isCompleted ? 'bg-luxury-500' : 'bg-gray-300 dark:bg-gray-600'
                              }`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.orderItems.slice(0, 2).map(item => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    
                    {order.orderItems.length > 2 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-300">
                          +{order.orderItems.length - 2} more items
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-luxury-600 dark:text-luxury-400">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowOrderDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Order #{selectedOrder.orderNumber}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XCircle className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Order Information
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
                          <span className="ml-2 text-gray-800 dark:text-white font-medium">
                            {formatDate(selectedOrder.orderDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Shipping Address:</span>
                          <span className="ml-2 text-gray-800 dark:text-white font-medium">
                            {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Order Items
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedOrder.orderItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 dark:text-white">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Brand: {item.product.brand}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-800 dark:text-white">
                      Total Amount
                    </span>
                    <span className="text-3xl font-bold text-luxury-600 dark:text-luxury-400">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Order Notes</h4>
                    <p className="text-gray-600 dark:text-gray-300">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
