import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useEventData } from '../../hooks/useEvent';
import { createEvent, updateEvent } from '../../../actions/event';
import { Formik, FormikHelpers, Form, FormikProps } from 'formik';
import { eventValidationSchema } from '../../common/validationSchemas';
import { TextInput } from '../../common/TextInput';
import { TextArea } from '../../common/TextArea';
import { SelectInput } from '../../common/SelectInput';
import { DateInput } from '../../common/DateInput';
import { categoryData } from '../../../api/sampleData';

//test
import { v4 as uuidv4 } from 'uuid';
export interface MatchParams {
  id: string;
}

export interface EventFormValues {
  title: string;
  date: Date;
  category: string;
  description: string;
  venue: string;
  city: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const EventForm = ({ match }: Props) => {
  const eventId = match.params.id;
  const selectedEvent = useEventData(eventId);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues: EventFormValues = {
    title: selectedEvent?.title!,
    date: selectedEvent?.date!,
    category: selectedEvent?.category!,
    description: selectedEvent?.description!,
    venue: selectedEvent?.venue!,
    city: selectedEvent?.city!,
  };

  const handleFormSubmit = (
    values: EventFormValues,
    helpers: FormikHelpers<EventFormValues>
  ): void => {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: uuidv4(),
            hostedBy: 'bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png',
          })
        );

    //Redirect
    selectedEvent ? history.goBack() : history.push('/events');
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Modificar evento' : 'Crear evento'} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values: EventFormValues, helpers: FormikHelpers<EventFormValues>) => {
          handleFormSubmit(values, helpers);
        }}
        validationSchema={eventValidationSchema}
      >
        {(props: FormikProps<EventFormValues>) => (
          <Form className='ui form'>
            <TextInput
              name='title'
              placeholder='Titulo de evento'
              value={props.values.title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <SelectInput
              name='category'
              placeholder='Categoria'
              options={categoryData}
              value={props.values.category}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <TextArea
              name='description'
              placeholder='Descripccion'
              rows={3}
              value={props.values.description}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <TextInput
              name='city'
              placeholder='Ciudad'
              value={props.values.city}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <TextInput
              name='venue'
              placeholder='Lugar'
              value={props.values.venue}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <DateInput
              name='date'
              placeholder='Fecha'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              loading={props.isSubmitting}
              disabled={!props.isValid || !props.dirty || props.isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />

            <Button
              disabled={props.isSubmitting}
              onClick={() => history.goBack()}
              floated='left'
              content='Cancelar'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export { EventForm };
