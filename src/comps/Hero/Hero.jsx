import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './hero.css';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';


const Hero = () => {
  const [hardwareProducts, setHardwareProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);

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
    <div className="hero container mt-5">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-lg-12">
          <h2 className="display-4">Your Premier Source for Construction Materials</h2>
          <div className="hero-content mt-4">
            <div className="hero-wrench-icon">
              <FaScrewdriverWrench size={40} />
            </div>
            <p className="lead">Discover top-quality materials for your construction projects.</p>
            <p className="lead">Explore our extensive range of products curated for your needs.</p>
          </div>
          <div className="hero-latest-gtn mt-4">
            <h4>Discover Our Latest Additions</h4>
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
              {hardwareProducts.map(product => (
                <SplideSlide key={product.id} className="splide__slide col-md-4 mb-4">
                  <img src={product.image} alt={product.title} className="img-fluid rounded" style={{ height: '200px' }} />
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                  <p style={priceStyle}>Ksh {product.price.toFixed(2)}</p>
                </SplideSlide>
              ))}
            </Splide>
          </div>

    <div className="container mt-4">
        <h4 className="text-center">Browse More Products</h4>
        <div className="product-container">
            {moreProducts.map((product) => (
            <div key={product.id} className="product">
                <img src={product.image} alt={product.title} className="img-fluid rounded" style={{ height: '200px' }} />
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <p style={priceStyle}>Ksh {product.price.toFixed(2)}</p>
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







