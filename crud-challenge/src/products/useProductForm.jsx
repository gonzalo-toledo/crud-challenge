// useProductForm.js
import { useState } from 'react';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  price: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("Debe ser mayor a cero")
    .required("El precio es obligatorio"),
});

const useProductForm = (onCreate) => {
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      onCreate(formData);
      setFormData({ name: '', price: '' });
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useProductForm;
