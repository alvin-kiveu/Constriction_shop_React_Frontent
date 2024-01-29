import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const [itemQuantities, setItemQuantities] = useState(
    cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {})
  );

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      const removedItem = updatedCart.splice(index, 1)[0];
      setItemQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[removedItem.id];
        return updatedQuantities;
      });
      return updatedCart;
    });
  };

  const handleIncreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      const item = updatedCart[index];
      item.quantity += 1;
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.id]: item.quantity,
      }));
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      const item = updatedCart[index];
      if (item.quantity > 1) {
        item.quantity -= 1;
        setItemQuantities((prevQuantities) => ({
          ...prevQuantities,
          [item.id]: item.quantity,
        }));
      }
      return updatedCart;
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity,
      0
    );
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
                    <span className="mx-2">{itemQuantities[item.id]}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleIncreaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>Kshs {item.price ? (typeof item.price === 'string' ? parseFloat(item.price).toFixed(2) : item.price.toFixed(2)) : 'N/A'}</td>
                <td>Kshs {item.price ? (typeof item.price === 'string' ? parseFloat(item.price).toFixed(2) * item.quantity : item.price * item.quantity).toFixed(2) : 'N/A'}</td>
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
              <td>Kshs {calculateTotalPrice().toFixed(2)}</td>
              <td>
                <Link to="/checkout">
                  <button className="btn btn-success" style={{ backgroundColor: '#E8AE5C' }}>
                    Proceed to Checkout
                  </button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Cart;



