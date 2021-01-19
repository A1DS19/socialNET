import React, { Fragment, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { EventListItemLoader } from './EventListItemLoader';
import { EventFilters } from './EventFilters';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { listenToEventsFromFirestore } from '../../../firestore/firestoreService';
import { EventData, listenEventsFS } from '../../../actions/event';

const EventDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: StoreState) => state.events);
  const { loading } = useSelector((state: StoreState) => state.loading);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events: EventData[]) => dispatch(listenEventsFS(events)),
    dependencies: [dispatch],
  });

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
