// // import React from 'react';
// // import { FaScrewdriverWrench } from 'react-icons/fa6';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './about.css'; // Make sure to create a CSS file for styling (aboutUs.css)

// // const AboutUs = () => {
// //   return (
// //     <div className="about-us container mt-5">
// //       <div className="row justify-content-center align-items-center text-center">
// //         <div className="col-lg-12">
// //           <h2 className="display-4">About Us</h2>
// //           <div className="about-us-content mt-4">
// //             <div className="about-us-wrench-icon">
// //               <FaScrewdriverWrench size={40} />
// //             </div>
// //             <p className="lead">
// //               Welcome to <b>JENGA</b>, your premier source for high-quality construction materials.
// //             </p>
// //             <p className="lead">
// //               We are dedicated to providing top-notch products designed to elevate construction
// //               projects of all sizes.
// //             </p>
// //           </div>

// //           <div className="mission-section mt-4">
// //             <h4>Our Mission</h4>
// //             <p>
// //               At <b>JENGA</b>, our mission is to provide a comprehensive range of construction materials that
// //               combine quality, innovation, and sustainability.
// //             </p>
// //             <p>
// //               We believe in empowering builders with the tools they need to bring their visions to life while ensuring
// //               the utmost safety and durability.
// //             </p>
// //           </div>

// //           <div className="commitment-section mt-4">
// //             <h4>Our Commitment to Quality</h4>
// //             <p>
// //               We take pride in our commitment to delivering products that exceed industry standards. Every item in our
// //               inventory undergoes stringent quality checks to ensure it meets the highest benchmarks for performance and
// //               reliability.
// //             </p>
// //             <p>Your satisfaction and the success of your project are at the core of what we do.</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutUs;



// import React from 'react';
// import { FaUser } from 'react-icons/fa'; // Importing the profile icon from react-icons

// const ConstructionProfessionals = () => {
//   // Dummy data for construction professionals
//   const professionals = [
//     { name: 'John Doe', profession: 'Plumber', phoneNumber: '+1234567890', rating: 4.5 },
//     { name: 'Jane Smith', profession: 'Masonry', phoneNumber: '+1987654321', rating: 4.2 },
//     { name: 'Michael Johnson', profession: 'Electrician', phoneNumber: '+1122334455', rating: 4.8 },
//     // { name: 'Emily Wilson', profession: 'Carpenter', phoneNumber: '+1567890123', rating: 4.0 },
//     // { name: 'David Brown', profession: 'Painter', phoneNumber: '+1456789012', rating: 4.7 },
//     // { name: 'Lisa Jones', profession: 'Roofer', phoneNumber: '+1765432109', rating: 4.3 },
//     // { name: 'Matthew Taylor', profession: 'Landscaper', phoneNumber: '+1654321098', rating: 4.6 },
//     // { name: 'Amanda Martinez', profession: 'HVAC Technician', phoneNumber: '+1345678901', rating: 4.4 },
//     // { name: 'Chris Wilson', profession: 'Plumber', phoneNumber: '+1987654321', rating: 4.2 },
//     // { name: 'Rachel Garcia', profession: 'Masonry', phoneNumber: '+1765432109', rating: 4.3 },
//     // { name: 'Daniel Anderson', profession: 'Electrician', phoneNumber: '+1234567890', rating: 4.5 },
//     // { name: 'Michelle Clark', profession: 'Carpenter', phoneNumber: '+1987654321', rating: 4.2 },
//     // { name: 'James Rodriguez', profession: 'Painter', phoneNumber: '+1456789012', rating: 4.7 },
//     // { name: 'Sarah Lee', profession: 'Roofer', phoneNumber: '+1765432109', rating: 4.3 },
//     // { name: 'Andrew White', profession: 'Landscaper', phoneNumber: '+1654321098', rating: 4.6 },
//     // Add more professionals here if needed
//   ];

//   return (
//     <div className="container">
//       <h2>Construction Professionals</h2>
//       <div className="row">
//         {professionals.map((professional, index) => (
//           <div key={index} className="col-lg-6">
//             <div className="professional">
//               <div className="profile-icon">
//                 <FaUser size={50} />
//               </div>
//               <div className="professional-details">
//                 <h3>{professional.name}</h3>
//                 <p>Profession: {professional.profession}</p>
//                 <p>Phone Number: {professional.phoneNumber}</p>
//                 <p>Rating: {professional.rating}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConstructionProfessionals;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([
    { name: 'John Doe', profession: 'Plumber', phoneNumber: '+1234567890', rating: 4.5 },
    { name: 'Jane Smith', profession: 'Masonry', phoneNumber: '+1987654321', rating: 4.2 },
    { name: 'Michael Johnson', profession: 'Electrician', phoneNumber: '+1122334455', rating: 4.8 },
    { name: 'Emma Davis', profession: 'Carpenter', phoneNumber: '+1555555555', rating: 4.4 },
    { name: 'Daniel Brown', profession: 'Painter', phoneNumber: '+1666666666', rating: 4.6 },
    { name: 'Olivia Wilson', profession: 'Landscaper', phoneNumber: '+1777777777', rating: 4.7 },
    { name: 'William Martinez', profession: 'Roofing Contractor', phoneNumber: '+1888888888', rating: 4.3 },
    { name: 'Sophia Anderson', profession: 'HVAC Technician', phoneNumber: '+1999999999', rating: 4.9 },
    { name: 'James Taylor', profession: 'Plasterer', phoneNumber: '+2000000000', rating: 4.1 },
    { name: 'Isabella Thomas', profession: 'Tiler', phoneNumber: '+2111111111', rating: 4.0 },
    { name: 'Ethan Garcia', profession: 'Window Installer', phoneNumber: '+2222222222', rating: 4.8 }
  ]);

  const listItemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const badgeStyle = {
    backgroundColor: '#007bff',
    borderRadius: '15px',
    padding: '5px 10px',
    color: '#fff',
  };

  return (
    <div className="container mt-5">
      <h1>List of Professionals</h1>
      <ul className="list-group mt-3">
        {professionals.map((professional, index) => (
          <li key={index} className="list-group-item" style={listItemStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{professional.name}</h5>
                <p>{professional.profession}</p>
                <p>Phone: {professional.phoneNumber}</p>
              </div>
              <span style={badgeStyle}>{professional.rating}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Professionals;
