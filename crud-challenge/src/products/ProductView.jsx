import React, { useState, useEffect } from "react";
import initialProducts from "./ProductData";
import ProductForm from "./ProductForm";
import exportToPdf from '../utils/ExportToPdf';

const ProductView = () => {
  // Cargar productos desde localStorage o usar los iniciales
  const loadProducts = () => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  };

  const [productList, setProductList] = useState(loadProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Guardar en localStorage cuando la lista cambie
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productList));
  }, [productList]);

  const handleCreate = (product) => {
    const newProduct = {
      id: Date.now(), // Usar timestamp para ID único
      name: product.name,
      price: Number(product.price),
    };
    setProductList([...productList, newProduct]);
  };

  const handleDelete = (id) => {
    const updated = productList.filter((product) => product.id !== id);
    setProductList(updated);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price });
  };

  const handleUpdate = () => {
    const updatedList = productList.map((product) =>
      product.id === editingProduct.id
        ? { ...product, name: formData.name, price: Number(formData.price) }
        : product
    );
    setProductList(updatedList);
    setEditingProduct(null);
    setFormData({ name: "", price: "" });
  };

  const handlePrint = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
      setShowPrintPreview(false);
    }, 300);
  };

  const getTotalPrice = () => {
    return productList.reduce((sum, product) => sum + Number(product.price), 0);
  };

  return (
    <div className={`app-container ${showPrintPreview ? 'print-mode' : ''}`}>
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="app-title">Gestión de Productos</h1>
          <div className="action-buttons">
            <button className="print-button" onClick={() => exportToPdf(productList, "Productos", ["ID", "Nombre", "Precio"])}>
              <span className="icon">🖨️</span>
              Imprimir
            </button>
          </div>
        </header>

        <div className="main-content">
          <div className="form-section">
            <h2 className="section-title">Agregar nuevo producto</h2>
            <ProductForm onCreate={handleCreate} />
          </div>

          <div className="products-section">
            <h2 className="section-title">Lista de productos</h2>
            {productList.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No hay productos disponibles.</p>
                <p>Agrega un producto para comenzar.</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {productList.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">${product.price}</div>
                      </div>
                      <div className="product-actions">
                        <button 
                          className="edit-button" 
                          onClick={() => startEdit(product)}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary-section">
                  <div className="total-container">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">${getTotalPrice()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {editingProduct && (
          <div className="edit-modal-backdrop">
            <div className="edit-modal">
              <h2 className="edit-title">Editar producto</h2>
              <div className="edit-form">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre del producto"
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="Precio"
                    className="edit-input"
                  />
                </div>
                <div className="edit-actions">
                  <button 
                    className="cancel-button"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancelar
                  </button>
                  <button onClick={handleUpdate} className="save-button">
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Versión para imprimir */}
        {showPrintPreview && (
          <div className="print-preview">
            <div className="print-header">
              <h1>Catálogo de Productos</h1>
              <p className="print-date">Fecha: {new Date().toLocaleDateString()}</p>
            </div>
            
            <table className="print-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="total-label">Total</td>
                  <td className="total-value">${getTotalPrice()}</td>
                </tr>
              </tfoot>
            </table>
            
            <div className="print-footer">
              <p>© {new Date().getFullYear()} - Sistema de Gestión de Productos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;