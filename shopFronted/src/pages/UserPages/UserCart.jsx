import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GenHeader from '../../components/GenHeader';
import Footer from '../../components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[]);
  const [cartCount, setCartCount] = useState(cartItems.length);

  const [shippingInfo, setShippingInfo] = useState({
    address: "nairobi center",
    city: "Nairobi",
    state: "kanya",
    country: "KENYA",
    postalCode: "000000",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentInfo, setPaymentInfo] = useState({
    id: "",
    status: "",
    method: "",
    amountPaid: 0
  });

  const [loading, setLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    )
    localStorage.setItem('cart',JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

  };
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId)
    localStorage.setItem('cart',JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = parseFloat((subtotal * 0.00).toFixed(2));
  const shipping = 0.00;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const order = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity
      })),
      shippingInfo,
      paymentInfo: {
        id: paymentMethod === "card" ? "pi_1XYZ" : paymentMethod === "paypal" ? "pp_1234" : "mp_5678",
        status: "succeeded",
        method: paymentMethod,
        amountPaid: total
      },
      paymentMethod,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total
    };

    try {
      const res = await axios.post("http://localhost:4000/api/orders", order, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('cart');
      setLoading(false);
      setCheckoutSuccess(true);
      setCartItems([]);
    } catch (err) {
      setLoading(false);
      if(!err.response.data.login && err.response.data.message == "Invalid Token"){
        alert('please login to place the order');
        window.location.href = "/auth"; // Redirect to login
      }else{
        alert("❌ please ensure you fill all field to continue");
      }
      setError(err.response?.data?.message || "Order submission failed. Please try again.");
      // console.log(err);
      
    }
  };

  if (checkoutSuccess) {
    return (
      <>
      <GenHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your order total was ${total.toFixed(2)}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/orders" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              View Orders
            </Link>
            <Link 
              to="/homepage" 
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      
      </>
    );
  }

  return (
    <>
    <GenHeader />
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
            <div className="mt-6">
              <Link
                to="/homepage"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Items ({cartItems.length})</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full sm:w-32 h-32 object-cover rounded-md"
                          />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">{item.category.name}</p>
                            </div>
                            <p className="mt-2 sm:mt-0 text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="text-sm font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary and Checkout */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(shippingInfo).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type={key === 'phone' ? 'tel' : 'text'}
                        value={value}
                        onChange={e => setShippingInfo({ ...shippingInfo, [key]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="mpesa">M-Pesa</option>
                </select>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${loading || cartItems.length === 0 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}