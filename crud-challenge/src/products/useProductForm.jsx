// useProductForm.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  price: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("Debe ser mayor a cero")
    .required("El precio es obligatorio"),
});

const useProductForm = (onCreate) => {
  const formik = useFormik({
    initialValues: { name: '', price: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onCreate(values);
      resetForm();
    },
  });

  return {
    formData: formik.values,
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    errors: formik.errors,
  };
};

export default useProductForm;
