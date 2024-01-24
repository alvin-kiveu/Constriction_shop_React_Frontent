import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

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
        const hardwareResponse = await fetch('http://localhost:3001/hardwareProducts');
        const hardwareData = await hardwareResponse.json();

        // Fetch moreProducts
        const moreResponse = await fetch('http://localhost:3001/moreProducts');
        const moreData = await moreResponse.json();

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
    <div className="hero container mt-5" style={{ backgroundColor: '#f8f9fa', padding: '40px 0' }}>
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
                // <Link to={`/product/${product.id}`} key={product.id} className="text-decoration-none text-dark">
                  <SplideSlide key={product.id} className="splide__slide col-md-4 mb-4">
                    <div className="card" style={{ width: '100%' }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top img-fluid rounded"
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <div className="card-body">
                        <h5 style={{ fontSize: '18px', marginTop: '10px', color: '#6c757d', textAlign: 'left' }}>
                          {product.title}
                        </h5>
                        <p
                          style={{
                            fontSize: '14px',
                            marginBottom: '10px',
                            textAlign: 'left',
                            color: '#6c757d',
                          }}
                        >
                          {product.description}
                        </p>
                        <p
                          style={{
                            ...priceStyle,
                            fontSize: '14px',
                            marginBottom: '0',
                            textAlign: 'left',
                          }}
                        >
                          Ksh {product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </SplideSlide>
                // </Link>
              ))}
            </Splide>
          </div>

          <div className="container mt-4">
            <h4 className="text-center" style={{ color: '#343a40', marginBottom: '20px' }}>
              Browse More Products
            </h4>

            <div className="row">
              {moreProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark"
                    style={{ width: '100%' }}
                  >
                    <div className="card" style={{ width: '100%' }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top img-fluid rounded"
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <div className="card-body">
                        <h5 style={{ fontSize: '18px', marginTop: '10px', color: '#6c757d', textAlign: 'left' }}>
                          {product.title}
                        </h5>
                        <p
                          style={{
                            fontSize: '14px',
                            marginBottom: '10px',
                            textAlign: 'left',
                            color: '#6c757d',
                          }}
                        >
                          {product.description}
                        </p>
                        <p
                          style={{
                            ...priceStyle,
                            fontSize: '14px',
                            marginBottom: '0',
                            textAlign: 'left',
                          }}
                        >
                          Ksh {product.price.toFixed(2)}
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










