import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useUnicorns } from '../context/UnicornsContext';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  age: Yup.number()
    .typeError('Debe ser un número')
    .positive('La edad debe ser positiva')
    .required('La edad es obligatoria'),
  color: Yup.string()
    .required('El color es obligatorio'),
  power: Yup.string()
    .required('El poder es obligatorio'),
});

const useUnicornForm = (onSubmit, unicorn) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      color: '#ffffff',
      power: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (unicorn) {
      formik.setValues({
        name: unicorn.name || '',
        age: unicorn.age || '',
        color: unicorn.color || '#ffffff',
        power: unicorn.power || '',
      });
    }
  }, [unicorn]);

  return {
    formData: formik.values,
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    isEditing: !!unicorn,
    errors: formik.errors,
  };
};

export default useUnicornForm;