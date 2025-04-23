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
    <div style={styles.container}>
      <h2 style={styles.title}>Unicornios</h2>
      <UnicornForm />

      <ul style={styles.list}>
        {unicorns.map((u) => (
          <li key={u._id} style={styles.card}>
            <div style={styles.details}>
              <strong>{u.name}</strong> ({u.age} años)
              <br />
              Color: <span style={{ color: u.color.toLowerCase() }}>{u.color}</span>
              <br />
              Poder: {u.power}
            </div>
            <div style={styles.buttons}>
              <button style={styles.editButton} onClick={() => startEdit(u)}>Editar</button>
              <button style={styles.deleteButton} onClick={() => handleDelete(u._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#7b2cbf',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    backgroundColor: '#d35400',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    lineHeight: '1.5',
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UnicornsView;
