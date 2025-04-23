import React, { useState } from "react";
import initialProducts from "./ProductData";

const ProductView = () => {
  const [productList, setProductList] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });

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
        ? { ...product, name: formData.name, price: formData.price }
        : product
    );
    setProductList(updatedList);
    setEditingProduct(null);
    setFormData({ name: "", price: "" });
  };

  const handleCreate = () => {
    const newProduct = {
      id: productList.length + 1,
      name: formData.name,
      price: formData.price,
    };
    setProductList([...productList, newProduct]);
    setFormData({ name: "", price: "" });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Productos</h1>

      {/* Formulario */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          style={styles.input}
        />
        <button onClick={handleCreate} style={styles.addButton}>Agregar</button>
      </div>

      {/* Lista de productos */}
      <ul style={styles.list}>
        {productList.map((product) => (
          <li key={product.id} style={styles.card}>
            <div>
              <strong>{product.name}</strong> - ${product.price}
            </div>
            <div style={styles.buttons}>
              <button style={styles.editButton} onClick={() => startEdit(product)}>Editar</button>
              <button style={styles.deleteButton} onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario de edición */}
      {editingProduct && (
        <div style={styles.editForm}>
          <h2>Editando: {editingProduct.name}</h2>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre"
            style={styles.input}
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="Precio"
            style={styles.input}
          />
          <button onClick={handleUpdate} style={styles.saveButton}>Guardar</button>
        </div>
      )}
    </div>
  );
};

// 🎨 Estilos
const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#0077b6',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    alignItems: 'center',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1',
  },
  addButton: {
    backgroundColor: '#38b000',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    backgroundColor: '#2c3e50',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    backgroundColor: '#0288d1',
    color: 'white',
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editForm: {
    marginTop: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#2c3e50',
  },
  saveButton: {
    marginTop: '0.5rem',
    backgroundColor: '#43a047',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProductView;
