import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';

const EventDashboard = (): JSX.Element => {
  const events = useSelector((state: StoreState) => state.events);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
