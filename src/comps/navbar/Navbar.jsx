import { useState } from 'react';
import './navbar.css';
import jengaLogo from '../assets/jengaLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState('shop')

    const activeItemStyle = {
        color: '#E8AE5C',
        borderBottom: '2px solid #E8AE5C',
      };
      const linkStyle = {
        textDecoration: 'none', // Remove underline
        color: 'inherit', // Inherit color from the parent
      };
  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <div className='logo navbar-brand'>
          <img src={jengaLogo} alt="logo" className="logo-img" />
        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active" onClick={()=>{setMenu('shop')}} >
            <span style={menu === 'shop' ? activeItemStyle : null}><Link to='/' style={linkStyle}>Shop</Link></span>
            </li>
            <li className="nav-item" onClick={()=>{setMenu('categories')}} >
            <span style={menu === 'categories' ? activeItemStyle : null}><Link to='/categories' style={linkStyle}>Categories</Link></span>
            </li>
            <li className="nav-item" onClick={()=>{setMenu('deals')}}>
            <span style={menu === 'deals' ? activeItemStyle : null}><Link to='/deals' style={linkStyle}> Deals</Link></span>
            </li>
            <li className="nav-item"onClick={()=>{setMenu('about')}} >
            <span style={menu === 'about' ? activeItemStyle : null}><Link to='/about' style={linkStyle}>About Us</Link></span>
            </li>
          </ul>
        </div>

        <div className="nav-login-cart">
          <Link to='/login'><button className="btn btn-primary">Login</button></Link>
        </div>
        
        <div className="nav-cart">
          <Link to='cart'><BsCart4 className="cart-icon"  /></Link>
          <span className="badge badge-pill badge-warning cart-count">0</span>

          
        </div>
      </div>
    </div>
  );
}

export default Navbar;

