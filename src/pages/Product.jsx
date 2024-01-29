import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Product = ({ onAddToCart }) => {
  const [onOfferProducts, setOnOfferProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch hardware products
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        const products = await response.data;

        // Filter products that are on offer
        const onOffer = products.filter(product => product.on_offer);

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

  const notify = (productName) => {
    toast.success(`${productName} added to cart!`, {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#dcae6e', 
        color: '#fff',
        padding: '10px',
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">On Offer Products</h2>
      <ToastContainer  bodyClassName="custom-toast-body" />
      <div className="row">
        {onOfferProducts.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card" style={cardStyle}>
              <img src={product.image} alt={product.title} className="card-img-top" />
              <div className="card-body" style={cardBodyStyle}>
                <div>
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <p className="card-text" style={priceStyle}>
                Ksh {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : 'N/A'}
                </p>

                <button
                  className="btn btn-primary"
                  style={buttonStyle}
                  onClick={() => {
                    onAddToCart(product);
                    notify(product.title);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;




