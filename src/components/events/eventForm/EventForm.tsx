import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { useEventData } from '../../hooks/useEvent';
import { EventData, listenEventsFS } from '../../../actions/event';
import { Formik, FormikHelpers, Form, FormikProps } from 'formik';
import { eventValidationSchema } from '../../common/validationSchemas';
import { TextInput } from '../../common/TextInput';
import { TextArea } from '../../common/TextArea';
import { LocationInput } from '../../common/LocationInput';
import { SelectInput } from '../../common/SelectInput';
import { DateInput } from '../../common/DateInput';
import { categoryData } from '../../../api/sampleData';
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc';
import {
  cancelEventToggle,
  listenToEventFromFirestore,
} from '../../../firestore/firestoreService';
import { StoreState } from '../../../reducers';
import { LoaderComponent } from '../../common/Loader';
import { toast } from 'react-toastify';
import {
  addEventToFirestore,
  updateEventFirestore,
} from '../../../firestore/firestoreService';
import { v4 as uuidv4 } from 'uuid';
export interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const EventForm = ({ match }: Props) => {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const eventId = match.params.id;
  const selectedEvent = useEventData(eventId);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state: StoreState) => state.loading);

  useFirestoreDoc({
    shouldExecute: !!eventId,
    query: () => listenToEventFromFirestore(eventId),
    data: (event: EventData) => dispatch(listenEventsFS([event])),
    dependencies: [eventId],
  });

  if (loading) return <LoaderComponent content='Cargando Evento...' />;

  if (error) return <Redirect to='/error' />;

  const initialValues: EventData = {
    id: selectedEvent ? selectedEvent?.id : uuidv4.toString(),
    title: selectedEvent?.title!,
    date: selectedEvent?.date!,
    category: selectedEvent?.category!,
    description: selectedEvent?.description!,
    venue: selectedEvent?.venue!,
    city: selectedEvent?.city!,
  };

  const handleCancel = async (event: any) => {
    setConfirmOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  };

  const handleFormSubmit = async (
    values: EventData,
    helpers: FormikHelpers<EventData>
  ) => {
    try {
      selectedEvent
        ? await updateEventFirestore(values)
        : await addEventToFirestore(values);
      helpers.setSubmitting(false);
      //Redirect
      selectedEvent ? history.goBack() : history.push('/events');
    } catch (error) {
      toast.error(error.message);
      helpers.setSubmitting(false);
    }
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Modificar evento' : 'Crear evento'} />

      <Formik
        initialValues={initialValues}
        validationSchema={eventValidationSchema}
        onSubmit={(values: EventData, helpers: FormikHelpers<EventData>) => {
          handleFormSubmit(values, helpers);
        }}
      >
        {(props: FormikProps<EventData>) => {
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
                onClick={() => history.push(`/events/${eventId}`)}
                floated='right'
                content='Volver'
              />

              {selectedEvent && (
                <Button
                  loading={loadingCancel}
                  type='button'
                  floated='left'
                  color={selectedEvent.isCancelled ? 'green' : 'red'}
                  content={
                    selectedEvent?.isCancelled ? 'Activar Evento' : 'Cancelar Evento'
                  }
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                />
              )}
            </Form>
          );
        }}
      </Formik>

      <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'Esta a punto de activar el evento esta seguro?'
            : 'Esta a punto de cancelar el evento esta seguro?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancel(selectedEvent)}
      />
    </Segment>
  );
};

export { EventForm };
