import React, { Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from "react";

const UnicornsView = ({ 
    unicorns, 
    loading, 
    error, 
    onDelete, 
    onEdit,
    onCreate,
    onSaveEdit,
    editingUnicorn,
    setEditingUnicorn
}) => {
    const toast = React.useRef(null);
    const [newUnicorn, setNewUnicorn] = useState({
        name: '',
        color: '',
        age: 0,
        power: ''
    });

    const bodyActions = (rowData) => {
        return (
            <div className="p-d-flex p-gap-2">
                <Button     
                    label="Editar"
                    className="p-button-rounded p-button-success"
                    onClick={() => onEdit(rowData)}
                />
                <Button 
                    label="Eliminar"
                    className="p-button-rounded p-button-danger"
                    onClick={() => {
                        if(window.confirm('¿Eliminar este unicornio?')) {
                            onDelete(rowData._id);
                        }
                    }}
                />
            </div>
        );
    };

    const handleCreate = (e) => {
        e.preventDefault();
        onCreate(newUnicorn);
        setNewUnicorn({
            name: '',
            color: '',
            age: 0,
            power: ''
        });
    };

    if (error) {
        return <div className="p-m-4 p-d-inline-flex p-ai-center">
            <i className="pi pi-exclamation-triangle p-mr-2" />
            <span>Error: {error}</span>
        </div>;
    }

    return (
        <Fragment>
            <Toast ref={toast} />
            
            {/* Formulario de creación */}
            <div className="p-card p-mb-4 p-p-4">
                <h3>Crear nuevo unicornio</h3>
                <form onSubmit={handleCreate} className="p-fluid">
                    <div className="p-grid p-formgrid">
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="name">Nombre</label>
                            <InputText
                                id="name"
                                value={newUnicorn.name}
                                onChange={(e) => setNewUnicorn({...newUnicorn, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="color">Color</label>
                            <InputText
                                id="color"
                                value={newUnicorn.color}
                                onChange={(e) => setNewUnicorn({...newUnicorn, color: e.target.value})}
                                required
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-2">
                            <label htmlFor="age">Edad</label>
                            <InputNumber
                                id="age"
                                value={newUnicorn.age}
                                onValueChange={(e) => setNewUnicorn({...newUnicorn, age: e.value})}
                                required
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="power">Poder</label>
                            <InputText
                                id="power"
                                value={newUnicorn.power}
                                onChange={(e) => setNewUnicorn({...newUnicorn, power: e.target.value})}
                                required
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-1 p-flex p-ai-end">
                            <Button 
                                label="Crear" 
                                icon="pi pi-plus" 
                                type="submit"
                                loading={loading}
                                className="p-button-raised"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Formulario de edición */}
            {editingUnicorn && (
                <div className="p-card p-mb-4 p-p-4">
                    <h3>Editando unicornio</h3>
                    <div className="p-fluid">
                        <div className="p-grid p-formgrid">
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="edit-name">Nombre</label>
                                <InputText
                                    id="edit-name"
                                    value={editingUnicorn.name}
                                    onChange={(e) => setEditingUnicorn({...editingUnicorn, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="edit-color">Color</label>
                                <InputText
                                    id="edit-color"
                                    value={editingUnicorn.color}
                                    onChange={(e) => setEditingUnicorn({...editingUnicorn, color: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-2">
                                <label htmlFor="edit-age">Edad</label>
                                <InputNumber
                                    id="edit-age"
                                    value={editingUnicorn.age}
                                    onValueChange={(e) => setEditingUnicorn({...editingUnicorn, age: e.value})}
                                    required
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="edit-power">Poder</label>
                                <InputText
                                    id="edit-power"
                                    value={editingUnicorn.power}
                                    onChange={(e) => setEditingUnicorn({...editingUnicorn, power: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-1 p-flex p-ai-end p-jc-end">
                                <Button 
                                    label="Guardar" 
                                    icon="pi pi-check" 
                                    onClick={onSaveEdit}
                                    loading={loading}
                                    className="p-button-success p-mr-2"
                                />
                                <Button 
                                    label="Cancelar" 
                                    icon="pi pi-times" 
                                    onClick={() => setEditingUnicorn(null)}
                                    className="p-button-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla de datos */}
            <DataTable 
                header="Unicorns" 
                value={unicorns} 
                paginator 
                rows={10}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="p-datatable-striped"
                emptyMessage="No se encontraron unicornios"
            >
                <Column field="name" header="Name" sortable filter></Column>
                <Column field="color" header="Color" sortable filter></Column>
                <Column field="age" header="Age" sortable></Column>
                <Column field="power" header="Power" sortable></Column>
                <Column 
                    body={bodyActions} 
                    header="Actions"
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                ></Column>
            </DataTable>
        </Fragment>
    );
};

export default UnicornsView;