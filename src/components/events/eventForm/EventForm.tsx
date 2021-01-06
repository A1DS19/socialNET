import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
interface EventFormProps {
  setFormOpen: (state: boolean) => void;
}

const EventForm = ({ setFormOpen }: EventFormProps) => {
  const removeForm = () => setFormOpen(false);

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
        <Button type='submit' floated='left' content='Cancelar' onClick={removeForm} />
      </Form>
    </Segment>
  );
};

export { EventForm };
