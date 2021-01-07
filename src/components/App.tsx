import './css/app.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { EventDashboard } from './events/eventDashboard/EventDashboard';
import { Navbar } from './nav/Navbar';
import { HomePage } from './home/HomePage';
import { EventDetail } from './events-detail/EventDetail';
import { EventForm } from './events/eventForm/EventForm';

export interface EventData {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: EventAttendee[];
}

export interface EventAttendee {
  id: string;
  name: string;
  photoURL: string;
}

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Fragment>
              <Navbar />
              <Container className='main'>
                <Route exact path='/events' component={EventDashboard} />
                <Route exact path='/events/:id' component={EventDetail} />
                <Route
                  exact
                  path={['/createEvent', '/manage/:id']}
                  component={EventForm}
                />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    </Router>
  );
};

export { App };
