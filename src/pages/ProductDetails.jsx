import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

      <img src={product.thumbnail} alt={product.thumbnail} />
      <h2>{product.title}</h2>
      <p><span>Description: </span>{product.description}</p>
      <p><span>Category: </span>{product.category}</p>
      <p><span>Price: </span>{product.price}</p>
      <p><span>Discount</span>{product.discountPercentage}</p>
      <p><span>Rating: </span>{product.rating}</p>
      <p><span>Stock: </span>{product.stock}</p>
      <p><span>Tags: </span>{product.tags}</p>
      <p><span>Brand: </span>{product.brand}</p>

      <p>
        images will be here
      </p>
    </div>
  );
}

export default ProductDetails;