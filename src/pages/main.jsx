import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

function Main() {
  const [products, setProducts] = useState([]);

  // get all products
  useEffect(() => {
    axios.get(`https://dummyjson.com/products`)
      .then(result => {
        // console.log(result);
        setProducts(result.data.products);
      })
      .catch((error) => console.log(error))
      .finally(() => '');
  }, []);

  return (
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
          products.map((row, rowId) => (
            <tr key={rowId}>
              <td>{row.id}</td>
              <td><img src={row.thumbnail} alt={row.thumbnail} width='100' /></td>
              <td>{row.title}</td>
              <td>{row.price}</td>
              <td>{row.category}</td>
              <td>{row.rating}</td>
              <td>{row.discountPercentage}</td>
              
              <td><a href="#"><button>Details</button></a></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default Main;