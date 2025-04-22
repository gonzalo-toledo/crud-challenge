import React from "react";
import UnicornsView from "./UnicornsView";
import { useState, useEffect, useContext } from "react";
import { UnicornContext } from "../../context/UnicornContext";


const API_URL = 'https://crudcrud.com/api/137d1a6181b341c1b10223e7cb746b29/unicorns';


const UnicornsContainer = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingUnicorn, setEditingUnicorn] = useState(null);

    const {unicorns, getUnicorns} = useContext(UnicornContext)


    // const fetchUnicorns = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(API_URL);
            
    //         if (!response.ok) throw new Error(response.statusText);
            
    //         const data = await response.json();
    //         setUnicorns(data);
    //     } catch (error) {
    //         setError(error.message);
    //         console.error("Fetch error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    
    const createUnicorn = async (newUnicorn) => {
        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUnicorn)
            });

            if (!response.ok) throw new Error('Error al crear el unicornio');

            // const createdUnicorn = await response.json();
            // setUnicorns([...unicorns, createdUnicorn]);
            await getUnicorns(); // Actualiza la lista de unicornios después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Create error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateUnicorn = async (id, updatedData) => {
        try {
            setLoading(true);
            console.log(id, updatedData);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    name: updatedData.name,
                    age: updatedData.age,
                    color: updatedData.color,
                    power: updatedData.power
                }),
                mode: 'cors' // Asegúrate de que está en modo cors
            });
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            console.log(response);
            // const updatedUnicorn = await response.json();
            // setUnicorns(unicorns.map(u => u._id === id ? updatedUnicorn : u));
            return true;
        } catch (error) {
            setError(`Error al actualizar: ${error.message}`);
            console.error("Update error:", error);
            return false;
        } finally {
            setLoading(false);
            setEditingUnicorn(null);
            getUnicorns();
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar el unicornio');

            setUnicorns(unicorns.filter(u => u._id !== id));
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Delete error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
    };

    const handleSaveEdit = async () => {
        if (editingUnicorn) {
            const success = await updateUnicorn(editingUnicorn._id, editingUnicorn);
            if (success) {
                setEditingUnicorn(null);
            }
        }
    };




    return (
        <UnicornsView 
            unicorns={unicorns}
            loading={loading}
            error={error}
            onCreate={createUnicorn}
            onEdit={handleEdit}
            onDelete={deleteUnicorn}
            onSaveEdit={handleSaveEdit}
            editingUnicorn={editingUnicorn}
            setEditingUnicorn={setEditingUnicorn}
        />
    );
};

export default UnicornsContainer;