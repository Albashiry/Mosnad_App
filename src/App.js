import './App.css';
import ProductList from './pages/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShopingCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
