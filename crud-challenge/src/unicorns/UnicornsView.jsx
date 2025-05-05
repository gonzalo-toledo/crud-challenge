import React, { useState } from 'react';
import { useUnicorns } from '../context/UnicornsContext';
import UnicornForm from './UnicornForm';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import exportToPdf from '../utils/ExportToPdf';

const UnicornsView = () => {
  const {
    unicorns,
    handleDelete,
    handleCreate,
    handleUpdate,
    editingUnicorn,
    startEdit,
  } = useUnicorns();

  const [displayModal, setDisplayModal] = useState(false);

  const openNew = () => {
    startEdit(null);
    setDisplayModal(true);
  };

  const onSubmit = (values) => {
    if (editingUnicorn) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
    setDisplayModal(false);
  };

  const footer = (unicorn) => (
    <div className="unicorn-card-footer">
      <Button 
        icon="pi pi-pencil" 
        className="p-button-rounded p-button-warning p-button-outlined" 
        onClick={() => {
          startEdit(unicorn);
          setDisplayModal(true);
        }}
      />
      <Button 
        icon="pi pi-trash" 
        className="p-button-rounded p-button-danger p-button-outlined" 
        onClick={() => handleDelete(unicorn._id)}
      />
    </div>
  );

  // Función para generar un fondo de degradado basado en el color del unicornio
  const getGradientBackground = (color) => {
    return `linear-gradient(135deg, ${color}22 0%, ${color}66 100%)`;
  };

  return (
    <div className="unicorns-container">
      <div className="unicorns-header">
        <h2 className="unicorns-title">✨ Mis Unicornios Mágicos ✨</h2>
        <div className="unicorns-actions">
          <Button 
            label="Nuevo Unicornio" 
            icon="pi pi-plus" 
            onClick={openNew}
            className="p-button-help unicorn-button"
          />
          <Button 
            label="Exportar PDF" 
            icon="pi pi-file-pdf" 
            onClick={() => exportToPdf(unicorns, "Unicorns", ["ID", "Nombre", "Edad", "Color", "Poder"])}
            className="p-button-danger unicorn-button"
          />
        </div>
      </div>

      {unicorns.length === 0 ? (
        <div className="unicorns-empty-state">
          <i className="pi pi-star-fill empty-icon"></i>
          <p>¡No hay unicornios todavía! Añade uno nuevo para comenzar tu colección mágica.</p>
          <Button 
            label="Crear Primer Unicornio" 
            icon="pi pi-plus" 
            onClick={openNew}
            className="p-button-help"
          />
        </div>
      ) : (
        <div className="unicorns-grid">
          {unicorns.map((unicorn) => (
            <div key={unicorn._id} className="unicorn-card-wrapper">
              <Card 
                title={
                  <div className="unicorn-card-title">
                    <span>{unicorn.name}</span>
                    <div className="unicorn-color-dot" style={{ backgroundColor: unicorn.color }}></div>
                  </div>
                }
                subTitle={`${unicorn.age} años de magia`}
                footer={() => footer(unicorn)}
                className="unicorn-card"
                style={{ background: getGradientBackground(unicorn.color) }}
              >
                <div className="unicorn-card-content">
                  <div className="unicorn-color-display" style={{ backgroundColor: unicorn.color }}>
                    <i className="pi pi-star-fill unicorn-icon"></i>
                  </div>
                  <div className="unicorn-details">
                    <p className="unicorn-power">
                      <i className="pi pi-bolt"></i> Poder: {unicorn.power}
                    </p>
                    <div className="unicorn-color-code">
                      <span>Color: </span>
                      <span className="color-hex">{unicorn.color}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Dialog 
        visible={displayModal} 
        onHide={() => setDisplayModal(false)}
        header={editingUnicorn ? "Editar Unicornio" : "Nuevo Unicornio"}
        style={{ width: '50vw' }}
        breakpoints={{ '960px': '75vw', '640px': '90vw' }}
        className="unicorn-dialog"
      >
        <UnicornForm 
          unicorn={editingUnicorn} 
          onSubmit={onSubmit}
        />
      </Dialog>
    </div>
  );
};

export default UnicornsView;