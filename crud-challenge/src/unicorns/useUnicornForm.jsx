import { useState, useEffect } from 'react';
import { useUnicorns } from '../context/UnicornsContext';

const useUnicornForm = () => {
  const {
    handleCreate,
    handleUpdate,
    editingUnicorn,
  } = useUnicorns();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    color: '',
    power: '',
  });

  useEffect(() => {
    if (editingUnicorn) {
      setFormData({
        name: editingUnicorn.name || '',
        age: editingUnicorn.age || '',
        color: editingUnicorn.color || '',
        power: editingUnicorn.power || '',
      });
    } else {
      setFormData({ name: '', age: '', color: '', power: '' });
    }
  }, [editingUnicorn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUnicorn) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
    setFormData({ name: '', age: '', color: '', power: '' });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isEditing: !!editingUnicorn
  };
};

export default useUnicornForm;
