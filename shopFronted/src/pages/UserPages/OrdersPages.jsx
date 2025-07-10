import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaShoppingBag,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
  FaHome,
  FaBox,
  FaInfoCircle,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { RiRefund2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import GenHeader from '../../components/GenHeader';
import Footer from '../../components/Footer';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/orders', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const rawOrders = response.data.data;
        // console.log(rawOrders);
        const formatted = rawOrders.map((order) => ({
          id: order.orderId,
          date: order.createdAt,
          status: order.orderStatus,
          total: order.paymentInfo.amountPaid,
          items: order.items.map((item) => ({
            name: item.productId.title,
            price: item.price,
            quantity: item.quantity,
            image: item.productId.image || 'https://via.placeholder.com/80',
          })),
          shipping: {
            address: `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`,
            tracking: order.trackingNumber || 'Not shipped yet',
            estimated: order.estimatedDelivery || 'Calculating...',
          },
        }));
        // console.log(formatted);

        setOrders(formatted);
        setFilteredOrders(formatted);
        setLoading(false);
      } catch (err) {
        // console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === activeTab));
    }
  }, [activeTab, orders]);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold flex items-center';
    switch (status) {
      case 'completed':
        return `${base} bg-green-50 text-green-800`;
      case 'processing':
        return `${base} bg-blue-50 text-blue-800`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-800`;
      case 'shipped':
        return `${base} bg-purple-50 text-purple-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500 mr-2" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500 mr-2" />;
      case 'shipped':
        return <FiPackage className="text-purple-500 mr-2" />;
      default:
        return <BsClockHistory className="text-blue-500 mr-2" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GenHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">View and manage your order history</p>
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm whitespace-nowrap">
              {['all', 'processing', 'shipped', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 text-red-500 flex items-center justify-center">
                <FaTimesCircle className="text-3xl" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading orders</h3>
              <p className="mt-1 text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-24 w-24 text-gray-400 flex items-center justify-center">
                <FiPackage className="text-5xl" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-gray-500">
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `You don't have any ${activeTab} orders.`}
              </p>
              <Link
                to="/products"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order.id} className="hover:bg-gray-50 transition-colors">
                  <div
                    className="px-4 py-5 sm:px-6 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="hidden sm:block">{getStatusIcon(order.status)}</div>
                        <div>
                          <p className="text-sm font-medium text-indigo-600">Order #{order.id}</p>
                          <p className="text-xs text-gray-500">
                            Placed on {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                        <div className="sm:hidden">
                          <span className={getStatusBadge(order.status)}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="hidden sm:block">
                          <span className={getStatusBadge(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        </div>
                        <FaChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="px-4 py-5 sm:p-6 border-t border-gray-200 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                          <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img className="h-10 w-10 rounded-md object-cover" src={item.image} alt={item.name} />
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${order.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">$0.00</span>
                              </div>
                              <div className="flex justify-between border-t border-gray-200 pt-2">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">$0.00</span>
                              </div>
                              <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-3">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Information</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div>
                                <strong className="text-gray-700">Address:</strong>
                                <p className="mt-1">{order.shipping.address}</p>
                              </div>
                              <div>
                                <strong className="text-gray-700">Tracking Number:</strong>
                                <p className="mt-1">{order.shipping.tracking}</p>
                              </div>
                              <div>
                                <strong className="text-gray-700">Estimated Delivery:</strong>
                                <p className="mt-1">
                                  {typeof order.shipping.estimated === 'string' 
                                    ? order.shipping.estimated 
                                    : formatDate(order.shipping.estimated)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.status === 'processing' && (
                              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <FaTimesCircle className="mr-2" /> Cancel Order
                              </button>
                            )}
                            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              View Invoice
                            </button>
                            {order.status === 'completed' && (
                              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Buy Again
                              </button>
                            )}
                            {order.status === 'cancelled' && (
                              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <RiRefund2Line className="mr-2" /> Request Refund
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
          <Footer />
    </div>
  );
}