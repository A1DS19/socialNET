import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import { TextInput } from '../common/TextInput';
import { registerValidationSchema } from '../common/validationSchemas';
import { ModalWrapper } from '../common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modals';
import { registerFirebase } from '../../firestore/firebaseService';
import { SocialLogin } from './SocialLogin';

export interface RegisterFormValues {
  email: string;
  password: string;
  displayName: string;
  authError?: string;
}

const RegisterForm = () => {
  const dispatch = useDispatch();
  const initialValues: RegisterFormValues = {
    email: '',
    displayName: '',
    password: '',
  };

  return (
    <ModalWrapper header='Registro' size='mini'>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={async (
          values: RegisterFormValues,
          helpers: FormikHelpers<RegisterFormValues>
        ) => {
          try {
            helpers.setSubmitting(true);
            await registerFirebase(values);
            helpers.setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            helpers.setSubmitting(false);
            helpers.setErrors({ authError: error.message });
          }
        }}
      >
        {(props: FormikProps<RegisterFormValues>) => (
          <Form className='ui form'>
            {props.errors.authError && (
              <Label
                basic
                style={{ marginBottom: 10 }}
                color='red'
                content={props.errors.authError}
              />
            )}
            <TextInput
              name='email'
              label='Email'
              placeholder='Email'
              value={props.values.email}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <TextInput
              name='displayName'
              label='Nombre'
              placeholder='Nombre'
              value={props.values.displayName}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              type='password'
              label='Contrasena'
              name='password'
              placeholder='Contrasena'
              value={props.values.password}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <Button
              loading={props.isSubmitting}
              disabled={!props.isValid || !props.dirty || props.isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Registro'
            />
            <Divider horizontal>O</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export { RegisterForm };
