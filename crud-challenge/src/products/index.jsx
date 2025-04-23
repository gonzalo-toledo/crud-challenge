import React from 'react';
import ProductView from './ProductView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const ProductsPage = () => {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<ProductView />} />
      </Routes>
  </Router>
  );
};
export default ProductsPage;
