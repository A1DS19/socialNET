import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useEventData } from '../../hooks/useEvent';
import { createEvent, updateEvent } from '../../../actions/event';
export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const EventForm = ({ match }: Props) => {
  const history = useHistory();
  const eventId = match.params.id;
  const selectedEvent = useEventData(eventId);

  const dispatch = useDispatch();

  // const handleFormSubmit = (e: ChangeEvent<HTMLInputElement>): void => {
  //   selectedEvent ? dispatch(updateEvent()) : dispatch(createEvent());
  //   history.push('/events');
  // };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Modificar evento' : 'Crear nuevo evento'} />
      <Form>
        <Form.Field>
          <input type='text' placeholder='Nombre de Evento' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='Categoria' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='Descripccion' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='Lugar' />
        </Form.Field>
        <Form.Field>
          <input type='date' placeholder='Fecha' />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          onClick={() => history.goBack()}
          type='submit'
          floated='left'
          content='Cancelar'
        />
      </Form>
    </Segment>
  );
};

export { EventForm };
