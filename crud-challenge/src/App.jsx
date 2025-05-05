import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { UnicornsProvider } from "./context/UnicornsContext";
import ProductsPage from "./products";
import UnicornsPage from "./unicorns";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Componente NavBar separado para manejar la navegación
const NavBar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Unicornios',
      icon: 'pi pi-star',
      command: () => navigate('/unicorns')
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      command: () => navigate('/products')
    },
  ];

  const start = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <i className="pi pi-magic" style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#7b2cbf' }}></i>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c3e50' }}>APLICACION SUPER MAGICA</span>
    </div>
  );


  return (
    <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '1rem' }}>
      <Menubar 
        model={items} 
        start={start}
        style={{
          borderRadius: 0,
          padding: '0.5rem 2rem',
          backgroundColor: 'white',
          border: 'none'
        }}
      />
    </div>
  );
};

const App = () => (
  <Router>
    <div style={{ padding: "1rem", maxWidth: '1200px', margin: '0 auto' }}>
      <NavBar />
      <Routes>
        <Route
          path="/unicorns"
          element={
            <UnicornsProvider>
              <UnicornsPage />
            </UnicornsProvider>
          }
        />
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