import React, { useEffect, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopCategory = ({ onAddToCart }) => {
  const [hardwareProducts, setHardwareProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch moreProducts
        const moreResponse = await fetch('http://localhost:3001/moreProducts');
        const moreData = await moreResponse.json();

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

  const uniqueCategories = Array.from(new Set(moreProducts.map((product) => product.category)));

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
    <div className="hero container mt-5">
      <ToastContainer bodyClassName="custom-toast-body" />
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
                    className={`card custom-card-class ${
                      selectedCategory === category ? 'custom-border-class' : ''
                    }`}
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
                  .filter((product) => product.category === selectedCategory)
                  .map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                      <div className="card" style={cardStyle}>
                        <img src={product.image} alt={product.title} className="card-img-top" />
                        <div className="card-body" style={cardBodyStyle}>
                          <div>
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                          </div>
                          <p className="card-text" style={buttonStyle}>
                            Ksh {product.price.toFixed(2)}
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




