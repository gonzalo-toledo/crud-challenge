import { useState, useEffect } from 'react';
import { useUnicorns } from '../context/UnicornsContext';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('El nombre es obligatorio'),
  age: Yup.number().typeError('Debe ser un número').required('La edad es obligatoria'),
  color: Yup.string().required('El color es obligatorio'),
  power: Yup.string().required('El poder es obligatorio'),
});

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

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (editingUnicorn) {
        handleUpdate(formData);
      } else {
        handleCreate(formData);
      }

      setFormData({ name: '', age: '', color: '', power: '' });

    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach(e => {
        formattedErrors[e.path] = e.message;
      });
      setErrors(formattedErrors);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isEditing: !!editingUnicorn,
    errors
  };
};

export default useUnicornForm;
