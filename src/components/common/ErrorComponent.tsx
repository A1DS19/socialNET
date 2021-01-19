import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { StoreState } from '../../reducers/index';

const ErrorComponent = (): JSX.Element => {
  const { error } = useSelector((state: StoreState) => state.loading);
  return (
    <Segment placeholder>
      <Header
        textAlign='center'
        content={error || 'Ha ocurrido un error inesperado...'}
      />
      <Button
        as={Link}
        to='/events'
        primary
        style={{ marginTop: 20 }}
        content='Volver a eventos'
      />
    </Segment>
  );
};

export { ErrorComponent };
