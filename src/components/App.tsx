import './css/app.css';
import React, { Fragment, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { EventDashboard } from './events/eventDashboard/EventDashboard';
import { Navbar } from './nav/Navbar';

const App = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <Fragment>
      <Navbar setFormOpen={setFormOpen} />
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </Fragment>
  );
};

export { App };
