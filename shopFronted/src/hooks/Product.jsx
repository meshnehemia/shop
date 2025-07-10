const Product = ({product,onBookNow, onAddToCart})=>{
    return(
        <div className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>
              <div className="product-info">
                <span className="product-category">{product.category.name}</span>
                {product.items && <span style={{ color: 'green', fontSize: '1rem' }}> available: {product.items} items</span>}
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  Ksh {product.price.toFixed(2)}{' '}
                  {product.originalPrice && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>ksh {product.originalPrice.toFixed(2)}</span>}
                </div>
                <div className="product-actions">
                  <button className="btn book-btn" onClick={()=>onBookNow(product)}>Book Now</button>
                  <button className="btn add-to-cart" onClick={()=> onAddToCart(product) }>Add to Cart</button>
                </div>
              </div>
            </div>
    )
}
export default Product;