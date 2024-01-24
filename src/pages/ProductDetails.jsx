import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details by ID
        const response = await fetch(`http://localhost:3001/moreProducts/${id}`);
        
        if (!response.ok) {
          // Handle non-successful responses (e.g., 404 Not Found)
          throw new Error(`Failed to fetch product details: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Log for debugging
        console.log('Product Details:', data);
  
        // Update state
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };
  
    fetchData(); // Make sure to call the fetchData function
  
    // Include the ID parameter in the dependency array if it's used inside the useEffect
  }, [id]);
  if (!product) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indication
  }

  return (
    <div className="container mt-5">
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
              <p style={{ ...priceStyle }}>Ksh {product.price.toFixed(2)}</p>
                <Link to="/checkout">
                 <button className="btn btn-primary" style={buttonStyle}>Add to cart</button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

