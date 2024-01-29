import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);



 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details by ID
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
        
        if (response.status !== 200) {
          throw new Error(`Failed to fetch product details: ${response.statusText}`);
        }
  
        const data = await response.data;
  
        // Update state
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };
  
    fetchData(); 
  
    
  }, [id]);
  if (!product) {
    return <div>Loading...</div>; 
  }

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

  const priceStyle = {
    color: '#e8ae5c',
  };

  return (
    <div className="container mt-5">
            <ToastContainer bodyClassName="custom-toast-body" />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top img-fluid rounded"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p style={{ ...priceStyle }}>
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
      </div>
    </div>
  );
};

export default ProductDetails;

