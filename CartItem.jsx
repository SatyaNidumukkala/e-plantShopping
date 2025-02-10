// src/CartItem.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Current cart: ", cart);
  }, [cart]);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumeric = parseFloat(item.cost.replace('$',''));
      const newTotal = total + costNumeric * item.quantity;
      console.log("Total amount: ", newTotal);
      return newTotal;
    }, 0);
  };


  const calculateTotalItemCost = (item) => {
    const costNumeric = parseFloat(item.cost.replace('$',''));
    return costNumeric * item.quantity;
  }

  //const handleContinueShopping = (e) => {
  // e.preventDefault();
  // setShowCart(false);
  //};

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    console.log("Increased quantity of product: ", item.name);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      console.log("Decresed quantity of product: ", item.name)
    } else if (item.quantity === 1) {
      dispatch(removeItem(item.name));
      console.log("Removed item: ", item.name);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    console.log("Removed item: ", item.name);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalItemCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;