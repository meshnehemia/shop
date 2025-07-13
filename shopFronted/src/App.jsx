// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import OrdersPage from './pages/UserPages/OrdersPages';
import CartPage from './pages/UserPages/UserCart';
import Products from './pages/UserPages/Products';
import { getAllProducts } from './api/ProductsApi';

function App() {
  const [cartCount, setCartCount] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0 );
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(); // get from AP
      setProductsData(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    let isNew = true;
    let updatedItems = [];
    let newItem = []
    try {
      updatedItems = JSON.parse(localStorage.getItem('cart'));
      updatedItems.map((item)=>{
        if(item._id === product._id){
          isNew = false;
          item.quantity = item.quantity+1;
        }
      });
    } catch (error) {
      updatedItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [];
    }
    if(isNew){
      newItem = {
          _id: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.imaga,
          category: product.category
      }  
      updatedItems.push(newItem);
    };
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    console.log(JSON.parse(localStorage.getItem('cart')));
    setCartCount(JSON.parse(localStorage.getItem('cart')).length);
    showNotification(`${product.title} added to cart!`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBookNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const bookingData = {
      product: selectedProduct,
      ...bookingForm
    };
    // console.log(bookingData)
  
    try {
      // Replace this URL with your actual booking API endpoint
      const res = await fetch('http://localhost:4000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
  
      if (!res.ok) throw new Error('Booking failed');
      const result = await res.json();
      // console.log(result);
      if(!result.status) throw new Error('someting went wrong');
      setShowConfirmation(true);
    } catch (err) {
      // console.error(err);
      alert("Failed to book. Please try again.");
    }
    
  };

  const resetBooking = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setShowConfirmation(false);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#4361ee',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '5px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
    });
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard"/> : <Navigate to="/auth"/>}/>
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard/*" element={token ? <Dashboard /> : <Navigate to="/auth" />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path='/orders' element ={<OrdersPage />} />
      <Route path='/userProducts' element={ <Products products={productsData} onAddToCart={handleAddToCart}
              onBookNow={handleBookNow}
            />
          }  />
      <Route path='/cart' element = {<CartPage />} />
      <Route path="*" element={<div className="text-center mt-20 text-red-500 text-xl">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
