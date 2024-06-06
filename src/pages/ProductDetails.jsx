import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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

      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={product.thumbnail} />

        <Card.Body style={{ width: '100%' }}>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>

        <ListGroup style={{ width: '100%' }} className="list-group-flush rounded-2">
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Category </span>{product.category}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Price </span>{product.price}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Discount</span>{product.discountPercentage}%</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Rating </span>{product.rating}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Stock </span>{product.stock}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Tags </span>{product.tags}</ListGroup.Item>
          <ListGroup.Item style={{ width: '90%', textAlign: 'left' }}><span>Brand </span>{product.brand}</ListGroup.Item>
        </ListGroup>

        <Card.Body style={{ width: '100%' }}>
          images will be here
          {console.log(product)}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductDetails;