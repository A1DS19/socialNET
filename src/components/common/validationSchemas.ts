import * as Yup from 'yup';

export const eventValidationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  category: Yup.string().required('La categoria es requerida'),
  description: Yup.string().required('La descripccion es requerida'),
  city: Yup.string().required('La ciudad es requerida'),
  venue: Yup.string().required('El lugar del evento es requerido'),
  date: Yup.string().required('La fecha es requerida'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  password: Yup.string().required('La contrasena es requerida'),
});
