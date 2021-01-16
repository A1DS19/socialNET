import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useEventData } from '../../hooks/useEvent';
import { createEvent, updateEvent, EventData } from '../../../actions/event';
import { Formik, FormikHelpers, Form, FormikProps } from 'formik';
import { eventValidationSchema } from '../../common/validationSchemas';
import { TextInput } from '../../common/TextInput';
import { TextArea } from '../../common/TextArea';
import { LocationInput } from '../../common/LocationInput';
import { SelectInput } from '../../common/SelectInput';
import { DateInput } from '../../common/DateInput';
import { categoryData } from '../../../api/sampleData';

//test
import { v4 as uuidv4 } from 'uuid';
export interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const EventForm = ({ match }: Props) => {
  const eventId = match.params.id;
  const selectedEvent = useEventData(eventId);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues: EventData = {
    title: selectedEvent?.title!,
    date: selectedEvent?.date!,
    category: selectedEvent?.category!,
    description: selectedEvent?.description!,
    venue: selectedEvent?.venue!,
    city: selectedEvent?.city!,
  };

  const handleFormSubmit = (
    values: EventData,
    helpers: FormikHelpers<EventData>
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
        onSubmit={(values: EventData, helpers: FormikHelpers<EventData>) => {
          handleFormSubmit(values, helpers);
        }}
        validationSchema={eventValidationSchema}
      >
        {(props: FormikProps<EventData>) => {
          const handleUndefined = () => {
            if (typeof props.values.city.latLng === 'undefined') {
              return { lat: 0, lng: 0 };
            } else {
              return props.values.city.latLng;
            }
          };
          return (
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

              <LocationInput
                name='city'
                placeholder='Ciudad'
                value={props.values.city}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />

              <LocationInput
                name='venue'
                placeholder='Lugar'
                value={props.values.venue}
                disabled={props.values.city ? !props.values.city?.latLng : true}
                options={{
                  location: new google.maps.LatLng(
                    props.values.city &&
                      (props.values.city!.latLng as google.maps.LatLngLiteral)
                  ),
                  radius: 1000,
                  type: ['establishment'],
                }}
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
          );
        }}
      </Formik>
    </Segment>
  );
};

export { EventForm };
