import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import { TextInput } from '../common/TextInput';
import { loginValidationSchema } from '../common/validationSchemas';
import { ModalWrapper } from '../common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../actions/auth';
import { closeModal } from '../../actions/modals';
import { SocialLogin } from './SocialLogin';

export interface LoginFormValues {
  email: string;
  password: string;
  authError?: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  return (
    <ModalWrapper header='Iniciar Sesion' size='mini'>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async (
          values: LoginFormValues,
          helpers: FormikHelpers<LoginFormValues>
        ) => {
          try {
            helpers.setSubmitting(true);
            await dispatch(signInUser(values));
            helpers.setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            helpers.setErrors({ authError: error.message });
            helpers.setSubmitting(false);
          }
        }}
      >
        {(props: FormikProps<LoginFormValues>) => (
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
              content='Login'
            />
            <Divider horizontal>O</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export { LoginForm };
