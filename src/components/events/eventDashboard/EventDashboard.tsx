import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { EventListItemLoader } from './EventListItemLoader';
import { EventFilters } from './EventFilters';

const EventDashboard = (): JSX.Element => {
  const { events } = useSelector((state: StoreState) => state.events);
  const { loading } = useSelector((state: StoreState) => state.loading);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? (
          <Fragment>
            <EventListItemLoader />
            <EventListItemLoader />
            <EventListItemLoader />
          </Fragment>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
