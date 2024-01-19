import React from 'react';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './about.css'; // Make sure to create a CSS file for styling (aboutUs.css)

const AboutUs = () => {
  return (
    <div className="about-us container mt-5">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-lg-12">
          <h2 className="display-4">About Us</h2>
          <div className="about-us-content mt-4">
            <div className="about-us-wrench-icon">
              <FaScrewdriverWrench size={40} />
            </div>
            <p className="lead">
              Welcome to <b>JENGA</b>, your premier source for high-quality construction materials.
            </p>
            <p className="lead">
              We are dedicated to providing top-notch products designed to elevate construction
              projects of all sizes.
            </p>
          </div>

          <div className="mission-section mt-4">
            <h4>Our Mission</h4>
            <p>
              At <b>JENGA</b>, our mission is to provide a comprehensive range of construction materials that
              combine quality, innovation, and sustainability.
            </p>
            <p>
              We believe in empowering builders with the tools they need to bring their visions to life while ensuring
              the utmost safety and durability.
            </p>
          </div>

          <div className="commitment-section mt-4">
            <h4>Our Commitment to Quality</h4>
            <p>
              We take pride in our commitment to delivering products that exceed industry standards. Every item in our
              inventory undergoes stringent quality checks to ensure it meets the highest benchmarks for performance and
              reliability.
            </p>
            <p>Your satisfaction and the success of your project are at the core of what we do.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

