import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://20.244.56.144/test';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="all-products-page">
      <h1>All Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;

