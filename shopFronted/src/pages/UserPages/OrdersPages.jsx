import React, { useState } from 'react';
import { FaShoppingBag, FaCheckCircle, FaTimesCircle, FaChevronDown } from 'react-icons/fa';

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Sample orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-06-15',
      status: 'completed',
      total: 149.99,
      items: [
        { name: 'Wireless Headphones', price: 99.99, quantity: 1, image: 'https://via.placeholder.com/80' },
        { name: 'Phone Case', price: 25.00, quantity: 2, image: 'https://via.placeholder.com/80' }
      ],
      shipping: {
        address: '123 Main St, Anytown, USA',
        tracking: 'UPS-987654321',
        estimated: '2023-06-20'
      }
    },
    {
      id: 'ORD-12346',
      date: '2023-06-18',
      status: 'processing',
      total: 89.50,
      items: [
        { name: 'Smart Watch', price: 89.50, quantity: 1, image: 'https://via.placeholder.com/80' }
      ],
      shipping: {
        address: '456 Oak Ave, Somewhere, USA',
        tracking: null,
        estimated: '2023-06-25'
      }
    },
    {
      id: 'ORD-12347',
      date: '2023-06-20',
      status: 'cancelled',
      total: 45.99,
      items: [
        { name: 'Bluetooth Speaker', price: 45.99, quantity: 1, image: 'https://via.placeholder.com/80' }
      ],
      shipping: {
        address: '789 Pine Rd, Nowhere, USA',
        tracking: null,
        estimated: null
      }
    }
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch(status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'processing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaCheckCircle className="text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Consistent with Homepage */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-indigo-600 hidden lg:block">Shop<span className="text-indigo-400">Now</span></a>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="#products" className="text-gray-700 hover:text-indigo-600">Products</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaShoppingBag className="text-gray-700 text-xl" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="hidden md:block">
              <select className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>My Account</option>
                <option>Logout</option>
              </select>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">My Orders</h1>
          
          {/* Order Status Tabs */}
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'processing' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Processing
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'cancelled' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <FaShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
              <a 
                href="/" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order.id} className="hover:bg-gray-50">
                  <div 
                    className="px-4 py-5 sm:px-6 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-indigo-600">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
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
                          className={`h-4 w-4 text-gray-400 transition-transform ${expandedOrder === order.id ? 'transform rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="px-4 py-5 sm:p-6 border-t border-gray-200 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                          <ul className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                              <li key={index} className="py-4 flex">
                                <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Order Summary */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Subtotal</span>
                                <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Shipping</span>
                                <span className="text-sm font-medium text-gray-900">$0.00</span>
                              </div>
                              <div className="flex justify-between border-t border-gray-200 pt-2">
                                <span className="text-base font-medium text-gray-900">Total</span>
                                <span className="text-base font-medium text-gray-900">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            {/* Shipping Info */}
                            <div className="mt-6">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                              <p className="text-sm text-gray-600">{order.shipping.address}</p>
                              {order.shipping.tracking && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-gray-900">Tracking Number:</p>
                                  <p className="text-sm text-indigo-600">{order.shipping.tracking}</p>
                                  <p className="text-xs text-gray-500 mt-1">Estimated delivery: {new Date(order.shipping.estimated).toLocaleDateString()}</p>
                                </div>
                              )}
                            </div>
                            
                            {/* Actions */}
                            <div className="mt-6 space-y-2">
                              {order.status === 'processing' && (
                                <button
                                  type="button"
                                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Cancel Order
                                </button>
                              )}
                              <button
                                type="button"
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                View Invoice
                              </button>
                              {order.status === 'completed' && (
                                <button
                                  type="button"
                                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Buy Again
                                </button>
                              )}
                            </div>
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">ShopNow</h3>
              <p className="text-sm text-gray-500">Quality products at affordable prices with excellent customer service.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">FAQs</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Returns & Exchanges</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Our Story</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-500">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Stay Connected</h3>
              <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}