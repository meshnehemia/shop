import { useState } from "react";

const GenHeader = ({cartCount}) =>{
    // const [cartCount, setCartCount] = useState(0);
    return(
    <header className="header">
        <nav className="navbar">
          <a href="/homepage" className="logo hidden lg:block">Shop<span>Now</span></a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="#products">Products</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="flex gap-2 items-center justify-center px-4 py-2">
            <select name="" id="" className='text-center font-semibold rounded-md'>
                <option value="login">login</option>
                <option value="signup">signup</option>
            </select>
            <a href="/cart" className='relative'>
                <i className="fas fa-shopping-cart w-full"></i>
                <span className="cart-count">{cartCount ? cartCount: localStorage.getItem('cart')?(JSON.parse(localStorage.getItem('cart')).length):0}</span>
            </a>
            <a href="/orders" className="px-3">
                <i class="fa-solid fa-shop-lock"></i>
            </a>
          </div>
        </nav>
      </header>
    )
}
export default GenHeader;