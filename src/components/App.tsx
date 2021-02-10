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
import { ToastContainer } from 'react-toastify';
import { ErrorComponent } from './common/ErrorComponent';
import { AccountPage } from '../components/auth/AccountPage';
import { ProfilePage } from './profiles/ProfilePage';
import { PrivateRoute } from './PrivateRoute';

const App = () => {
  const { key } = useLocation();

  return (
    <Fragment>
      <ModalManager />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Navbar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetail} />
              <PrivateRoute
                path={['/createEvent', '/manage/:id']}
                Component={EventForm}
                key={key}
              />
              <PrivateRoute path='/account' Component={AccountPage} />
              <PrivateRoute path='/profile/:id' Component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export { App };
