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
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          <span className="label-icon">📝</span>
          Nombre del producto
        </label>
        <input
          id="name"
          name="name"
          placeholder="Ej: Auriculares Bluetooth"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'input-error' : ''}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="price" className="form-label">
          <span className="label-icon">💰</span>
          Precio
        </label>
        <div className="price-input-container">
          <span className="currency-symbol">$</span>
          <input
            id="price"
            name="price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            type="number"
            step="0.01"
            className={`form-input price-input ${errors.price ? 'input-error' : ''}`}
          />
        </div>
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>

      <button type="submit" className="add-button">
        <span className="button-icon">+</span>
        Agregar producto
      </button>
    </form>
  );
};

export default ProductForm;