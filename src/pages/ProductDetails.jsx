import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { addToCart, removeFromCart, searchInCart } from '../data';

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]); // Dependency array ensures fetch happens only when productId changes


  const handleQuantityChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (newCount > 0) { // Ensure positive quantity
      setCount(newCount);
    }
  };


  const handleAddProduct = () => {
    const newProduct = {
      id: product.id,
      // title: product.title,
      // description: product.description,
      // category: product.category,
      // price: product.price,
      // discountPercentage: product.discountPercentage,
      // rating: product.rating,
      // stock: product.stock,
      // tags: product.tags,
      // brand: product.brand,
      // images: product.images,
      // thumbnail: product.thumbnail,
      count: count,
    };

    if (searchInCart(product.id)) {
      console.log('This product exists in the JSON object.');
      removeFromCart(newProduct);

    } else {
      console.log('This product does not exist in the JSON object.');
      addToCart(newProduct);

    }
    setAdded(!added);
  };

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error fetching product details: {error}</p>;
  }

  if (!product) {
    return null; // No product provided, so don't render anything
  }

  return (
    <div className="product-details">

      <Card>
        {/* <Card.Img src={product.thumbnail} variant="top" style={{ height: '250px', width: '250px', margin: '0 auto' }} /> */}
        <Carousel style={{ width: '100%' }}>
          {product.images.map((image, index) => (
            <Carousel.Item key={index} style={{ height: '600px' }}>
              <img className="d-block w-100 h-100" src={image} alt={product.title + ' Image ' + (index + 1)} />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body style={{ width: '100%' }}>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>

        <ListGroup style={{ width: '100%' }} className="list-group-flush">
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Category </span>{product.category}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Price </span>{product.price}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Discount</span>{product.discountPercentage}%</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Rating </span>{product.rating}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Stock </span>{product.stock}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Tags </span>{product.tags}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Brand </span>{product.brand}</ListGroup.Item>
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
            max={product.stock}
            value={count}
            onChange={handleQuantityChange}
          />
          {added == 0 && !searchInCart(product.id)
            ? <Button onClick={handleAddProduct} className='mt-0' variant="primary">Add to cart</Button>
            : <Button onClick={handleAddProduct} className='mt-0' variant="primary">Remove from cart</Button>}
        </InputGroup>
      </Card>
    </div>
  );
}

export default ProductDetails;