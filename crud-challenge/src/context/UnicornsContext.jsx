// context/UnicornsContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UnicornsContext = createContext();
const API_URL = 'https://crudcrud.com/api/a2aeaf78bbd3499aa2db4dd7bd34a669/unicorns';

export const UnicornsProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  const getUnicorns = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setUnicorns(data);
    } catch (err) {
      console.error('Error al obtener unicornios:', err);
    }
  };
  

  const handleCreate = async (values) => {
    try {
      const response = await axios.post(API_URL, values);
      console.log('Unicornio creado:', response.data);
      await getUnicorns();
    } catch (error) {
      console.error('Error al crear unicornio:', error);
    }
  };
  
  const handleUpdate = async (values) => {
    if (!editingUnicorn) return;
    try {
      const response = await axios.put(`${API_URL}/${editingUnicorn._id}`, values);
      console.log('Unicornio actualizado:', response.data);
      setEditingUnicorn(null);
      await getUnicorns();
    } catch (error) {
      console.error('Error al actualizar unicornio:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('Unicornio eliminado:', response.data);
      await getUnicorns();
    } catch (error) {
      console.error('Error al eliminar unicornio:', error);
    }
  };
  

  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
  };

  useEffect(() => {
    getUnicorns();
  }, []);

  return (
    <UnicornsContext.Provider
      value={{
        unicorns,
        handleCreate,
        handleUpdate,
        handleDelete,
        editingUnicorn,
        startEdit,
      }}
    >
      {children}
    </UnicornsContext.Provider>
  );
};

export const useUnicorns = () => useContext(UnicornsContext);
