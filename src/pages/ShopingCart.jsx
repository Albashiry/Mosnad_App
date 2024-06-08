import React, { useState, useEffect } from 'react';
import {cartData} from '../data';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]); // State for cart items (objects)

  // Function to add a product to the cart (example implementation)
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      // Update quantity if product already exists
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Add new item to cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Function to update product quantity in cart
  const handleQuantityChange = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Calculate subtotal (assuming a `price` property in each product)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate final total (assuming a potential discount or tax)
  // You can implement your logic here to calculate the final total
  // based on available discounts, taxes, or other factors.
  const calculateFinalTotal = (subtotal) => {
    // Example: Apply a 10% discount
    return subtotal * 0.9;
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="product-details">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <span>Price: ${item.price}</span>
                </div>
              </div>

              <div className="quantity-control">
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  min="1"
                  onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                />
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && ( // Only display totals if cart has items
        <div className="cart-totals">
          <p>Subtotal: ${calculateSubtotal()}</p>
          <p>Final Total: ${calculateFinalTotal(calculateSubtotal())}</p>
          {/* Add a button for checkout or further actions */}
          <button disabled={cartItems.length === 0}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
