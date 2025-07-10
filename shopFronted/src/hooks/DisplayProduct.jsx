import React from 'react';
import Product from './Product';

const DisplayProduct = ({ title = 'Featured Products', subtitle = 'Check out our most popular products that customers love', products = [], onBookNow, onAddToCart }) => {
    return (
        <section className="products" id="products">
        <div className="section-title">
          <h2>{title}</h2>
          <p>{ subtitle }</p>
        </div>
        <div className="product-grid">
          {products.map((product, idx) => (
            <Product product={product} onBookNow={onBookNow} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    )
}
export default DisplayProduct;