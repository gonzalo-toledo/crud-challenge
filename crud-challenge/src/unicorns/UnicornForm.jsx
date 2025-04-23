import React from 'react';
import useUnicornForm from './useUnicornForm';

const UnicornForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEditing
  } = useUnicornForm();

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
      />
      <input
        name="power"
        placeholder="Poder"
        value={formData.power}
        onChange={handleChange}
      />

      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default UnicornForm;
