import * as Yup from 'yup';

export const eventValidationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  category: Yup.string().required('La categoria es requerida'),
  description: Yup.string().required('La descripccion es requerida'),
  city: Yup.object().shape({ address: Yup.string().required('La ciudad es requerida') }),
  venue: Yup.object().shape({ address: Yup.string().required('El lugar es requerido') }),
  date: Yup.string().required('La fecha es requerida'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  password: Yup.string().required('La contrasena es requerida'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  displayName: Yup.string().required('El nombre es requerida'),
  password: Yup.string().required('La contrasena es requerida'),
});

export const changeUserDataValidationSchema = Yup.object({
  newPassword1: Yup.string()
    .required('La contrasena es requerida')
    .length(6, 'La contrasena debe tener minimo 6 caracteres'),
  newPassword2: Yup.string()
    .required('Favor repetir contrasena')
    .length(6, 'La contrasena debe tener minimo 6 caracteres')
    .oneOf([Yup.ref('newPassword1'), null], 'Las contrasenas no concuerdan'),
});

export const updateUserProfileDataSchema = Yup.object({
  displayName: Yup.string().required('Debe agregar su nuevo nombre de perfil'),
});
