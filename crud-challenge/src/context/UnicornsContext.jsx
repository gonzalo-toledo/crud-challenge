// context/UnicornsContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const UnicornsContext = createContext();
const API_URL = 'https://crudcrud.com/api/5100280788af4828a6cf4b77b9da7118/unicorns';

export const UnicornsProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  const getUnicorns = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUnicorns(data);
    } catch (err) {
      console.error('Error al obtener unicornios:', err);
    }
  };

  const handleCreate = async (values) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) getUnicorns();
    } catch (err) {
      console.error('Error al crear unicornio:', err);
    }
  };

  const handleUpdate = async (values) => {
    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setEditingUnicorn(null);
      getUnicorns();
    } catch (err) {
      console.error('Error al actualizar unicornio:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      getUnicorns();
    } catch (err) {
      console.error('Error al eliminar unicornio:', err);
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
