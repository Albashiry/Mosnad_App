import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <Carousel.Item key={index} style={{ height: '600px'}}>
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
      </Card>
    </div>
  );
}

export default ProductDetails;