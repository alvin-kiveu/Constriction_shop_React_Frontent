import React, { useEffect, useState } from 'react';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import './shopcategory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShopCategory = ({onAddToCart, cartItems}) => {
  const [hardwareProducts, setHardwareProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch moreProducts
        const moreResponse = await axios.get('http://127.0.0.1:8000/api/items/');
        const moreData = await moreResponse.data;

        // Update state
        setMoreProducts(moreData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

 

  const uniqueCategories = Array.from(new Set(moreProducts.map((product) => product.category_name)));

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

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const addToCart = (product) => {
    const productId = product.id;
    if (isProductInCart(productId)) {
      // Product already in cart, update quantity
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      onAddToCart(updatedCart);
    } else {
      // Product not in cart, add to cart with quantity 1
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      onAddToCart(updatedCart);
    }

    notify(product.title);
  };

  return (
    
    <div className="hero container mt-5">
      <ToastContainer  bodyClassName="custom-toast-body" />
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-lg-12">
          <div className="hero-wrench-icon">
            <FaScrewdriverWrench size={40} />
          </div>

          <div className="container mt-4">
            <div className="row">
              {uniqueCategories.map((category) => (
                <div key={category} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className={`card custom-card-class ${selectedCategory === category ? 'custom-border-class' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{category}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div className="container mt-4">
              <h2>Details for {selectedCategory}</h2>
              <div className="row">
                {moreProducts
                  .filter((product) => product.category_name === selectedCategory)
                  .map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                      <div className="card">
                        <img src={product.image} alt={product.title} className="card-img-top" />
                        <div className="card-body left-align">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;

