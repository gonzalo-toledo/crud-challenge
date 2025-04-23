import React from 'react';
import { useUnicorns } from '../context/UnicornsContext';
import UnicornForm from './UnicornForm';

const UnicornsView = () => {
  const {
    unicorns,
    handleDelete,
    startEdit,
    editingUnicorn,
  } = useUnicorns();

  return (
    <div>
      <h2>Unicornios</h2>
      <UnicornForm />

      <ul>
        {unicorns.map((u) => (
          <li key={u._id}>
            <strong>{u.name}</strong> ({u.age} años) - {u.color} - {u.power}
            <button onClick={() => startEdit(u)}>Editar</button>
            <button onClick={() => handleDelete(u._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnicornsView;
