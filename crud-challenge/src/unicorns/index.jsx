import React from 'react';
import UnicornsView from './UnicornsView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const UnicornsPage = () => {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<UnicornsView />} />
      </Routes>
  </Router>
  );
};

export default UnicornsPage;
