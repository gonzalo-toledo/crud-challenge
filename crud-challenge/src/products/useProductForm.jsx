import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  price: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("Debe ser mayor a cero")
    .required("El precio es obligatorio"),
});

const useProductForm = (onSubmit, product) => {
  const formik = useFormik({
    initialValues: product || { name: '', price: '' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
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