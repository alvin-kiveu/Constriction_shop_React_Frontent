import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  };

  const priceStyle = {
    color: '#e8ae5c',
  };

  const buttonStyle = {
    backgroundColor: '#e8ae5c', 
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  };



  return (
    <div className="container mt-5">
      <h2 className="mb-4">On Offer Products</h2>
      <div className="row">
        {onOfferProducts.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card" style={cardStyle}>
              <img src={product.image} alt={product.title} className="card-img-top" />
              <div className="card-body" style={cardBodyStyle}>
                <div>
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                  <p className="card-text" style={priceStyle}>${product.price.toFixed(2)}</p>
                  <Link to="/checkout">
                  <button className="btn btn-primary" style={buttonStyle}>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;



