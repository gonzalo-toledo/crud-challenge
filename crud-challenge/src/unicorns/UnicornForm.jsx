import React from 'react';
import useUnicornForm from './useUnicornForm';

const UnicornForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEditing,
    errors
  } = useUnicornForm();

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
      />
      {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

      <input
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
      />
      {errors.color && <p style={{ color: 'red' }}>{errors.color}</p>}

      <input
        name="power"
        placeholder="Poder"
        value={formData.power}
        onChange={handleChange}
      />
      {errors.power && <p style={{ color: 'red' }}>{errors.power}</p>}

      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default UnicornForm;
