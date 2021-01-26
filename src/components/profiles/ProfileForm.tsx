import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { UserDataProps } from './ProfilePage';
import { TextInput } from '../common/TextInput';
import { TextArea } from '../common/TextArea';
import { Button } from 'semantic-ui-react';
import { updateUserProfileDataSchema } from '../common/validationSchemas';
import { updateUserProfileData } from '../../firestore/firestoreService';
import { toast } from 'react-toastify';

interface Props {
  setEditMode: (state: React.SetStateAction<boolean>) => void;
}

interface Values {
  displayName: string | undefined;
  description: string | undefined;
  error?: string;
}

export const ProfileForm = ({ user, setEditMode }: UserDataProps & Props) => {
  const initialValues: Values = {
    displayName: user?.displayName,
    description: user?.description,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateUserProfileDataSchema}
      onSubmit={async (values: Values, helpers: FormikHelpers<Values>) => {
        try {
          await updateUserProfileData(values);
          setEditMode(false);
        } catch (error) {
          helpers.setErrors({ error: error.message });
          toast.error(error.message);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form className='ui form'>
          <TextInput
            name='displayName'
            placeholder='Nombre'
            value={props.values.displayName}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
          />
          <TextArea
            name='description'
            placeholder='Descripccion'
            value={props.values.description}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
          />
          <Button
            loading={props.isSubmitting}
            disabled={!props.isValid || !props.dirty || props.isSubmitting}
            type='submit'
            size='large'
            positive
            content='Actualizar Perfil'
          />
        </Form>
      )}
    </Formik>
  );
};
