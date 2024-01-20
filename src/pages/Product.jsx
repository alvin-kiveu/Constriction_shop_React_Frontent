import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Product = () => {
  const [onOfferProducts, setOnOfferProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch hardware products
        const response = await fetch('http://localhost:3001/hardwareProducts');
        const products = await response.json();

        // Filter products that are on offer
        const onOffer = products.filter(product => product.onOffer);

        // Set state
        setOnOfferProducts(onOffer);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">On Offer Products</h2>
      <div className="row">
        {onOfferProducts.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={product.image} alt={product.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

