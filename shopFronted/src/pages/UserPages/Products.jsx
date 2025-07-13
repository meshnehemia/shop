import React from "react";
import ShowProductByCategory from "../../hooks/ShowProductByCategory"
import GenHeader from "../../components/GenHeader";
import Footer from "../../components/Footer";

export default function Products({ products = [], onBookNow, onAddToCart }) {
    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        const categoryName = product.category?.name || 'Uncategorized';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {});

    return (
        <>
        < GenHeader />
        <div className="space-y-12">
            {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <ShowProductByCategory
                    key={category}
                    category={category}
                    products={categoryProducts}
                    onBookNow={onBookNow}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
        <Footer/>
        </>
    );
}