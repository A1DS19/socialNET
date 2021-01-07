import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

const EventForm = () => {
  const history = useHistory();

  return (
    <Segment clearing>
      <Header content='Crear nuevo evento' />
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
