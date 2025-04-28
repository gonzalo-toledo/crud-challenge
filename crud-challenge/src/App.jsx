import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UnicornsProvider } from "./context/UnicornsContext";
import ProductsPage from "./products";
import UnicornsPage from "./unicorns";

const items = [
  { label: "Unicorns", path: "/" },
  { label: "Products", path: "/products" },
];

const App = () => (
  <Router>
    <div style={{ padding: "1rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        {items.map((item, index) => (
          <Link key={index} to={item.path}>
            <button style={{ marginRight: "1rem" }}>{item.label}</button>
          </Link>
        ))}
      </nav>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/"
          element={
            <UnicornsProvider>
              <UnicornsPage />
            </UnicornsProvider>
          }
        />
      </Routes>
    </div>
  </Router>
);

export default App;
