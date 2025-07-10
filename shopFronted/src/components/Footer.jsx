const Footer= () =>{
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">ShopNow</h3>
              <p className="mt-4 text-sm text-gray-500">
                Your one-stop shop for all your needs. Quality products at affordable prices.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
              <div className="mt-4 space-y-2">
                <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600 block">Home</Link>
                <Link to="/products" className="text-sm text-gray-600 hover:text-indigo-600 block">Products</Link>
                <Link to="/about" className="text-sm text-gray-600 hover:text-indigo-600 block">About Us</Link>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-indigo-600 block">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Customer Service</h3>
              <div className="mt-4 space-y-2">
                <Link to="/faq" className="text-sm text-gray-600 hover:text-indigo-600 block">FAQs</Link>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-indigo-600 block">Returns & Refunds</Link>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-indigo-600 block">Shipping Policy</Link>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-indigo-600 block">Privacy Policy</Link>
              </div>
            </div>
          </div> */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} ShopNow. All rights reserved.
          </div>
        </div>
      </footer>
    )
}

export default Footer;