import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { addEventChatComment } from '../../firestore/firebaseService';
import { TextArea } from '../common/TextArea';
import { chatFormValidationSchema } from '../common/validationSchemas';

interface FormValues {
  comment: string;
}

interface Props {
  eventId: string | undefined;
  parentId: string | number | undefined;
  fromWho?: string | undefined;
  closeForm?: () => void;
}

export const EventChatForm = ({ eventId, parentId, closeForm, fromWho }: Props) => {
  const initialValues = {
    comment: '',
  };

  return (
    <Formik
      validationSchema={chatFormValidationSchema}
      initialValues={initialValues}
      onSubmit={async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          helpers.resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          helpers.setSubmitting(false);
          //si es un reply se cierra el formulario al final
          parentId !== 0 && closeForm!();
        }
      }}
    >
      {(props: FormikProps<FormValues>) => (
        <Form className='ui form'>
          <Fragment>
            <TextArea
              name='comment'
              placeholder={
                parentId !== 0 ? `Responder a ${fromWho}` : 'Ingrese Comentario'
              }
              value={props.values.comment}
              rows={2}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <Button
              style={{ marginTop: 0 }}
              size={parentId !== 0 ? 'small' : 'medium'}
              loading={props.isSubmitting}
              content={parentId !== 0 ? 'Responder' : 'Agregar Reply'}
              icon='edit'
              primary
              type='submit'
            />
          </Fragment>
        </Form>
      )}
    </Formik>
  );
};
