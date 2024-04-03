// Dashboard

import React, { useState, useEffect } from 'react';
import './dashboard.css'; // Importing the CSS file

const Dashboard = () => {
  // State to hold the fetched products
  const [products, setProducts] = useState([]);

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/products/products-within/50/center/7.320926759369312,9.141581794672462/unit/mi');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data.data); // Update state with fetched products
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div className="container">
      {products.map(product => (
        <div className="card" key={product._id}>
          <h2>{product.name}</h2>
          {/* You can display additional product information here */}
          {/* For example: <p>{product.productLocation.address}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
