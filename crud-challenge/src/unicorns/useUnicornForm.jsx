// useUnicornForm.jsx
import { useFormik } from 'formik';
import { useEffect } from 'react';
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

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      color: '',
      power: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingUnicorn) {
        handleUpdate(values);
      } else {
        handleCreate(values);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (editingUnicorn) {
      formik.setValues({
        name: editingUnicorn.name || '',
        age: editingUnicorn.age || '',
        color: editingUnicorn.color || '',
        power: editingUnicorn.power || '',
      });
    }
  }, [editingUnicorn]);

  return {
    formData: formik.values,
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    isEditing: !!editingUnicorn,
    errors: formik.errors,
  };
};

export default useUnicornForm;
