import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { cartData, removeFromCart } from '../data';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [count, setCount] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const products = data.products
      const filteredProducts = products.filter((product) => cartData.some((cartItem) => {
        if (cartItem.id === product.id) {
          product.count = cartItem.count; // Add count to product object
          return true; // Stop iterating cartData if a match is found
        }
        return false;
      }));

      setCartItems(filteredProducts);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cartItems]);

  // Function to update product quantity in cart
  const handleQuantityChange = (event) => {
    const newCount = parseInt(event.target.value);

    // change the total value by reference and change data in (cartItems, cartData, API)
    // ...

    // setCartItems(
    //   cartItems.map((item) =>
    //     item.id === productId ? { ...item, quantity: event.target.value } : item
    //   )
    // );
  };




  // // Function to add a product to the cart (example implementation)
  // const handleAddToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);
  //   if (existingItem) {
  //     // Update quantity if product already exists
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     // Add new item to cart with quantity 1
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  // };

  // // Function to remove a product from the cart
  // const handleRemoveFromCart = (productId) => {
  //   setCartItems(cartItems.filter((item) => item.id !== productId));
  // };

  // // Calculate subtotal (assuming a `price` property in each product)
  // const calculateSubtotal = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  // // Calculate final total (assuming a potential discount or tax)
  // // You can implement your logic here to calculate the final total
  // // based on available discounts, taxes, or other factors.
  // const calculateFinalTotal = (subtotal) => {
  //   // Example: Apply a 10% discount
  //   return subtotal * 0.9;
  // };


  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <Card style={{ width: '23rem' }}>
              <Button className="remove" onClick={() => removeFromCart(item)} variant="danger">X</Button>
              <Link to={`/products/${item.id}`}>
                <Card.Img className="img" title='Show details' variant="top" src={item.thumbnail} height='200px' />
              </Link>
              <Card.Title>{item.title}</Card.Title>
              {/* <Card.Body style={{ width: '100%' }}>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body> */}

              <ListGroup style={{ width: '100%' }} className="list-group-flush">
                <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Category: </span>{item.category}</ListGroup.Item>
                <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Price: </span>{item.price}</ListGroup.Item>
                <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Tags: </span>{item.tags}</ListGroup.Item>
                <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Brand: </span>{item.brand}</ListGroup.Item>
              </ListGroup>

              <InputGroup className="mb-0">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Quantity:
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="number"
                  min='1'
                  max={item.stock}
                  defaultValue={item.count}
                  value={count}
                  onChange={handleQuantityChange}
                />
                <Button variant="secondary">{(item.price * item.count).toFixed(2)}</Button>{' '}
              </InputGroup>
            </Card>
          ))}
        </div>
      )}

      {cartItems.length > 0 && ( // Only display totals if cart has items
        <div className="cart-totals">
          {/* <p>Subtotal: ${calculateSubtotal()}</p> */}
          {/* <p>Final Total: ${calculateFinalTotal(calculateSubtotal())}</p> */}
          {/* Add a button for checkout or further actions */}
          {/* <button disabled={cartItems.length === 0}>Checkout</button> */}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
