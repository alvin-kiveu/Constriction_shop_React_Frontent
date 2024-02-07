import './App.css';
import Navbar from './comps/navbar/Navbar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Footer from './comps/footer/Footer';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import {  useState } from 'react';
import Logout from './pages/Logout';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  const handleAddToCart = (product) => {
    const newItem = { ...product, quantity: 1 };
  
    setCartItems([...cartItems, newItem]);
  };
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setIsAuthenticated(true)
  };

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };

  
  
  return (
    <div>
      <BrowserRouter>
      <Navbar cartItemCount={cartItems.length} isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/categories' element={<ShopCategory onAddToCart={handleAddToCart}/>}/>
        <Route path='/deals' element={<Product onAddToCart={handleAddToCart}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
         <Route path='/signup' element={<Login onLogin={handleLogin} />} />
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/logout' element={<Logout onLogout={handleLogout}/>}/>
        <Route path='/product/:id' element={<ProductDetails onAddToCart={handleAddToCart}/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      <Footer/>
      
      </BrowserRouter>
     
      
    </div>
  );
}




export default App;
