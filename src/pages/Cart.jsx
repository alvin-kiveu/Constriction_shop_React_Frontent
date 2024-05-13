import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../config/index";
import ShippingDetails from './Shipping';

const Cart = ({ cartItems, setCartItems, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const handleIncreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      updatedCart[index] = {...updatedCart[index], quantity: updatedCart[index].quantity + 1};
      return updatedCart;
    });
  };
  
  const handleDecreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index] = {...updatedCart[index], quantity: updatedCart[index].quantity - 1};
      }
      return updatedCart;
    });
  };
  
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  useEffect(() => {
    if (isAuthenticated && redirecting) {
      handleProceedToCheckout();
      setRedirecting(false);
    }
  }, [isAuthenticated, redirecting]);

  const handleProceedToCheckout = async () => {
    setLoading(true);
    try {
      // if (!isAuthenticated) {
      //   console.log('User is not authenticated. Redirecting to login page...');
      //   navigate('/login');
      //   return;
      // }

      console.log('User is authenticated. Proceeding to checkout...');
       navigate('/checkout');
      
      // const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ cartItems }),
      // });
  
      // if (!response.ok) {
      //   throw new Error("Failed to initiate checkout");
      // }
  
      // const data = await response.json();
      // console.log("Response from server:", data);
  
      // const { checkout_session_url } = data;
  
      // if (!checkout_session_url) {
      //   throw new Error("Invalid response from server: checkout_session_url not found");
      // }
  
      // // Redirect to Stripe checkout using the checkout_session_url
      // window.location.href = checkout_session_url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleShipping = () => {
    // Here you can implement the logic to redirect to the shipping page
    navigate('/Shipping');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.title || 'Unknown Item'}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleDecreaseQuantity(index)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleIncreaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>Kshs {parseFloat(item.price).toFixed(2)}</td>
                <td>Kshs {(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td colSpan="2">Kshs {calculateTotalPrice().toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5" className="text-end">
                <button
                  className="btn btn-success"
                  style={{ backgroundColor: '#E8AE5C' }}
                  onClick={handleProceedToCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={handleShipping}
                >
                  Shipping
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Cart;
