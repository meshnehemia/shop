import React, { useState, useEffect } from 'react';
import DisplayProduct from '../hooks/DisplayProduct';
import { getAllProducts } from '../api/ProductsApi';
import '../index.css'
import GenHeader from '../components/GenHeader';
import Footer from '../components/Footer';

export default function Homepage() {
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
      const data = await getAllProducts(); // get from API
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

  return (
    <div>
      <GenHeader cartCount={ cartCount }/>
      <section className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Browse our collection of high-quality products and book your favorites today. Fast delivery and excellent customer service guaranteed.</p>
        <a href="#products" className="btn">Shop Now</a>
        <a href="#" className="btn btn-outline">Learn More</a>
      </section>

      <DisplayProduct products={ productsData } onBookNow={handleBookNow} onAddToCart={handleAddToCart} />
      {showModal && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && resetBooking()}>
          <div className="modal-content">
            <span className="close-modal" onClick={resetBooking}>&times;</span>
            {!showConfirmation ? (
              <form onSubmit={handleFormSubmit}>
                <h3>Book {selectedProduct?.title}</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" onChange={handleInputChange}required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input type="date" id="date" name="date" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Additional Notes</label>
                  <textarea id="message" name="message" onChange={handleInputChange} required></textarea>
                </div>
                <button type="submit" className="submit-booking">Submit Booking</button>
              </form>
            ) : (
              <div className="confirmation">
                <i className="fas fa-check-circle"></i>
                <h4>Booking Confirmed!</h4>
                <p>Thank you for your booking. We'll contact you shortly with more details.</p>
                <button className="btn" onClick={resetBooking}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
