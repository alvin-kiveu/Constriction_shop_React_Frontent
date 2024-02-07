import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [hardwareProducts, setHardwareProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);

  const priceStyle = {
    color: '#e8ae5c',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hardwareProducts
        const hardwareResponse = await axios.get('http://127.0.0.1:8000/api/items/');
        const hardwareData = await hardwareResponse.data;

        // Fetch moreProducts
        const moreResponse = await axios.get('http://127.0.0.1:8000/api/items/');
        const moreData = await moreResponse.data;

        // Update state
        setHardwareProducts(hardwareData);
        setMoreProducts(moreData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', padding: '40px 0' }}>
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-lg-12">
          <h2 className="display-4">Your Premier Source for Construction Materials</h2>
          <div className="hero-content mt-4" style={{ marginTop: '20px' }}>
            <div className="hero-wrench-icon" style={{ marginBottom: '20px' }}>
              <FaScrewdriverWrench size={40} />
            </div>
            <p className="lead" style={{ color: '#6c757d' }}>
              Discover top-quality materials for your construction projects.
            </p>
            <p className="lead" style={{ color: '#6c757d' }}>
              Explore our extensive range of products curated for your needs.
            </p>
          </div>
          <div className="hero-latest-gtn mt-4">
            <h4 style={{ color: '#343a40' }}>Discover Our Latest Additions</h4>
            <Splide
              options={{
                type: 'loop',
                perPage: 3,
                gap: '1rem',
                pagination: false,
                breakpoints: {
                  768: {
                    perPage: 2,
                  },
                  576: {
                    perPage: 1,
                  },
                },
              }}
            >
              {hardwareProducts.map((product) => (
                <SplideSlide key={product.id} className="col-md-4" style={{ marginBottom: '20px' }}>
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                    <div className="card">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top img-fluid rounded"
                        style={{ borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: '18px', color: '#6c757d', textAlign: 'left' }}>
                          {product.title}
                        </h5>
                        <p className="card-text" style={{ ...priceStyle, fontSize: '14px', textAlign: 'left' }}>
                          Ksh {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          </div>

          <div className="container mt-4">
            <h4 className="text-center" style={{ color: '#343a40', marginBottom: '20px' }}>
              Browse More Products
            </h4>

            <div className="row">
              {moreProducts.map((product) => (
                <div key={product.id} className="col-md-4" style={{ marginBottom: '20px' }}>
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                    <div className="card">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top img-fluid rounded"
                        style={{ borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: '18px', color: '#6c757d', textAlign: 'left' }}>
                          {product.title}
                        </h5>
                        <p className="card-text" style={{ ...priceStyle, fontSize: '14px', textAlign: 'left' }}>
                          Ksh {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;










