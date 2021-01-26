import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { changeUserDataValidationSchema } from '../common/validationSchemas';
import { TextInput } from '../common/TextInput';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../reducers';
import { changeUserPassword } from '../../firestore/firebaseService';
import { toast } from 'react-toastify';

interface ChangeUserData {
  newPassword1: string;
  newPassword2: string;
  authError?: string;
}

const AccountPage = () => {
  const user = useSelector((state: StoreState) => state.auth);
  const history = useHistory();
  const initialValues = {
    newPassword1: '',
    newPassword2: '',
  };

  if (user.currentUser?.providerId === 'google.com') {
    return (
      <div>
        <Header color='teal' sub content='Cuenta de Google' />
        <p>Favor visite Google para actualizar su cuenta</p>
        <Button
          icon='google'
          color='google plus'
          as={Link}
          to='https://www.google.com/'
          content='Ir a Google'
        />
      </div>
    );
  }

  if (user.currentUser?.providerId === 'facebook') {
    return (
      <div>
        <Header color='teal' sub content='Cuenta de Facebook' />
        <p>Favor visite Facebook para actualizar su cuenta</p>
        <Button
          icon='facebook'
          color='facebook'
          as={Link}
          to='https://www.facebook.com/'
          content='Ir a Facebook'
        />
      </div>
    );
  }

  return (
    <Segment>
      <Header dividing size='large' content='Cuenta' />
      <div>
        <Header
          color='teal'
          sub
          content='Cambiar Contrasena'
          style={{ marginBottom: 10 }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={changeUserDataValidationSchema}
          onSubmit={async (
            values: ChangeUserData,
            helpers: FormikHelpers<ChangeUserData>
          ) => {
            try {
              await changeUserPassword(values);
              toast.success('Contrasena cambiada');
              history.push('/events');
            } catch (error) {
              helpers.setErrors({ authError: error.message });
            } finally {
              helpers.setSubmitting(false);
            }
          }}
        >
          {(props: FormikProps<ChangeUserData>) => {
            return (
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
                  placeholder='Nueva Contrasena'
                  name='newPassword1'
                  type='password'
                  value={props.values.newPassword1}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <TextInput
                  placeholder='Repita la Contrasena'
                  name='newPassword2'
                  type='password'
                  value={props.values.newPassword2}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <Button
                  style={{ display: 'block' }}
                  loading={props.isSubmitting}
                  disabled={!props.isValid || !props.dirty || props.isSubmitting}
                  type='submit'
                  size='large'
                  positive
                  content='Cambiar Contrasena'
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Segment>
  );
};

export { AccountPage };
