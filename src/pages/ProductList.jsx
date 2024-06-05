import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";

function Main() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  // Flag to indicate if filtering is active
  const [isFilteringActive, setIsFilteringActive] = useState(false);

  const navigate = useNavigate(); // Use useNavigate inside the component


  // get all products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle search text change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // Filter products based on search term
    filterProducts(event.target.value);
  };

  // Function to filter products based on search term
  const filterProducts = (searchTerm) => {
    if (searchTerm) {
      setIsFilteringActive(true);
      const filteredData = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setIsFilteringActive(false);
      setFilteredProducts(products); // Reset filter if search term is empty
    }
  };

  // Function to handle product selection (redirect to details page)
  const handleShowDetails = (product) => {
    navigate(`/products/${product.id}`);
  };

  const displayedProducts = isFilteringActive ? filteredProducts : products;


  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  // const handleShowDetails = (product) => {
  //   const navigate = useNavigate(); // Use useNavigate inside the component
  //   navigate(`/products/${product.id}`);
  // };


  return (
    <>
      <input
        type="text"
        placeholder="Search Products"
        value={searchText}
        onChange={handleSearchChange}
      />
      {/* Display filter status conditionally */}
      {isFilteringActive && <p>Filtering by: "{searchText}"</p>}


      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>images</th>
            <th>title</th>
            <th>price</th>
            <th>category</th>
            <th>rating</th>
            <th>discount</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {
            displayedProducts.map((product, rowId) => (
              <tr key={rowId}>
                <td>{product.id}</td>
                <td><img src={product.thumbnail} alt={product.thumbnail} width='100' /></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
                <td>{product.discountPercentage}</td>

                <td>
                  {/* <button onClick={() => handleShowDetails(product)}>Details</button> */}
                  <Link to={`/products/${product.id}`}><button>Details</button></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default Main;