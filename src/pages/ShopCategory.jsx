import React, { useEffect, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shopcategory.css';

const ShopCategory = () => {
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

  return (
    <div className="hero container mt-5">
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
                  .filter((product) => product.category === selectedCategory)
                  .map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                      <div className="card">
                        <img src={product.image} alt={product.title} className="card-img-top" />
                        <div className="card-body left-align">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">${product.price.toFixed(2)}</p>
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

