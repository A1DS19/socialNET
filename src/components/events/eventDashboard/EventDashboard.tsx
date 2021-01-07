import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { sampleData } from '../../../api/sampleData';

const EventDashboard = (): JSX.Element => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={sampleData} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
