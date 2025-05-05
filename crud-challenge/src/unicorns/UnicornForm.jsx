import React from 'react';
import useUnicornForm from './useUnicornForm';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';

const UnicornForm = ({ unicorn, onSubmit }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEditing,
    errors
  } = useUnicornForm(onSubmit, unicorn);

  return (
    <form onSubmit={handleSubmit} className="unicorn-form">
      <div className="form-field">
        <label htmlFor="name">
          <i className="pi pi-tag field-icon"></i>
          Nombre
        </label>
        <InputText
          id="name"
          name="name"
          placeholder="Nombre del unicornio"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'p-invalid' : ''}
        />
        {errors.name && <small className="form-error">{errors.name}</small>}
      </div>

      <div className="form-field">
        <label htmlFor="age">
          <i className="pi pi-calendar field-icon"></i>
          Edad
        </label>
        <InputNumber
          id="age"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onValueChange={(e) => handleChange({ target: { name: 'age', value: e.value } })}
          className={errors.age ? 'p-invalid' : ''}
          showButtons
          buttonLayout="horizontal"
          decrementButtonClassName="p-button-secondary"
          incrementButtonClassName="p-button-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
        />
        {errors.age && <small className="form-error">{errors.age}</small>}
      </div>

      <div className="form-field">
        <label htmlFor="color">
          <i className="pi pi-palette field-icon"></i>
          Color
        </label>
        <div className="color-picker-container">
          <ColorPicker
            id="color"
            name="color"
            value={formData.color.replace('#', '')}
            onChange={(e) => handleChange({ target: { name: 'color', value: `#${e.value}` } })}
            className={errors.color ? 'p-invalid' : ''}
          />
          <div 
            className="color-preview" 
            style={{ backgroundColor: formData.color }}
          ></div>
          <span className="color-hex-value">{formData.color}</span>
        </div>
        {errors.color && <small className="form-error">{errors.color}</small>}
      </div>

      <div className="form-field">
        <label htmlFor="power">
          <i className="pi pi-bolt field-icon"></i>
          Poder
        </label>
        <InputText
          id="power"
          name="power"
          placeholder="Poder especial"
          value={formData.power}
          onChange={handleChange}
          className={errors.power ? 'p-invalid' : ''}
        />
        {errors.power && <small className="form-error">{errors.power}</small>}
      </div>

      <div className="form-actions">
        <Button 
          type="button" 
          label="Cancelar" 
          className="p-button-text"
          onClick={() => document.querySelector('.p-dialog-header-close').click()}
        />
        <Button 
          type="submit" 
          label={isEditing ? "Actualizar" : "Guardar"} 
          className="p-button-primary unicorn-button"
          icon={isEditing ? "pi pi-refresh" : "pi pi-save"}
        />
      </div>
    </form>
  );
};

export default UnicornForm;