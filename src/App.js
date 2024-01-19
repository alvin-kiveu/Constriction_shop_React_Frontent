import './App.css';
import Navbar from './comps/navbar/Navbar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import About from './pages/About';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/categories' element={<ShopCategory/>}/>
        <Route path='/deals' element={<Product/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path=':productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>


      </Routes>
      
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
