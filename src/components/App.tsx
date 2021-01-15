import './css/app.css';
import React, { Fragment } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { EventDashboard } from './events/eventDashboard/EventDashboard';
import { Navbar } from './nav/Navbar';
import { HomePage } from './home/HomePage';
import { EventDetail } from './events-detail/EventDetail';
import { EventForm } from './events/eventForm/EventForm';
import { ModalManager } from './common/modals/ModalManager';

const App = () => {
  const { key } = useLocation();

  return (
    <Fragment>
      <ModalManager />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Navbar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetail} />
              <Route
                exact
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export { App };
