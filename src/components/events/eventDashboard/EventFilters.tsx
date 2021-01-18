import React, { Fragment } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const EventFilters = () => {
  return (
    <Fragment>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filtros' />
        <Menu.Item content='Todos los Eventos' />
        <Menu.Item content='Voy a Ir' />
        <Menu.Item content='Voy a Hostear' />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Calendario' />
      <Calendar />
    </Fragment>
  );
};

export { EventFilters };
