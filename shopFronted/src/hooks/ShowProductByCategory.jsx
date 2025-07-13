import React, { useState } from "react";
import Product from "./Product";

const ShowProductByCategory = ({ category, products = [], onBookNow, onAddToCart }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleProducts = showAll ? products : products.slice(0, 10);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{category}</h2>
                    {products.length > 10 && (
                        <button 
                            onClick={toggleShowAll}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {showAll ? 'Show Less' : 'See More'}
                        </button>
                    )}
                </div>
                
                {/* Horizontal scroll container for normal view */}
                {!showAll && (
                    <div className="relative">
                        <div className="product-flex overflow-x-auto scrollbar-hide">
                            {visibleProducts.map((product, index) => (
                                <div key={index}>
                                    <Product 
                                        product={product} 
                                        onBookNow={onBookNow} 
                                        onAddToCart={onAddToCart} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Grid layout when "See More" is clicked */}
                {showAll && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleProducts.map((product, index) => (
                            <Product 
                                key={index} 
                                product={product} 
                                onBookNow={onBookNow} 
                                onAddToCart={onAddToCart} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default ShowProductByCategory;