// ProductForm.jsx
import React from 'react';
import useProductForm from './useProductForm';

const ProductForm = ({ onCreate }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    errors,
  } = useProductForm(onCreate);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />
      {errors.name && <span style={styles.error}>{errors.name}</span>}

      <input
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        type="number"
        style={styles.input}
      />
      {errors.price && <span style={styles.error}>{errors.price}</span>}

      <button type="submit" style={styles.addButton}>Agregar</button>
    </form>
  );
};

const styles = {
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
  addButton: {
    backgroundColor: '#38b000',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
};

export default ProductForm;
